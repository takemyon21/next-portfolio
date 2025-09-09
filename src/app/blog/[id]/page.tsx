// app/blog/[id]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import dayjs from 'dayjs';

type Category = { id: string; name: string };
type Eyecatch = { url: string };
type BlogPost = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  category?: Category[];
  eyecatch?: Eyecatch;
};

// 必要な環境変数を確認（未設定ならビルド失敗させる）
const { MICROCMS_SERVICE_DOMAIN, MICROCMS_API_KEY } = process.env;
if (!MICROCMS_SERVICE_DOMAIN || !MICROCMS_API_KEY) {
  throw new Error('Required env vars are missing: MICROCMS_SERVICE_DOMAIN and/or MICROCMS_API_KEY.');
}

async function fetchBlogPost(id: string): Promise<BlogPost> {
  const url = `https://${MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog/${encodeURIComponent(id)}`;

  const res = await fetch(url, {
    headers: { 'X-MICROCMS-API-KEY': MICROCMS_API_KEY as string },
    // cache: 'no-store',         // 開発中に毎回最新を取りたい場合
    // next: { revalidate: 60 },  // ISRしたい場合
  });

  if (res.status === 404) {
    // notFound() は never を返す（= ここでレンダー中断）
    return notFound();
  }
  if (!res.ok) {
    throw new Error(`microCMS error: ${res.status}`);
  }
  return (await res.json()) as BlogPost;
}

// ✅ params は Promise として受け取る
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const post = await fetchBlogPost(id); // 404は fetch 内で notFound() 済み

  const formattedDate = dayjs(post.publishedAt).format('YY.MM.DD');
  const categories = Array.isArray(post.category) ? post.category : [];
  const markup = { __html: post.content };

  return (
    <>
      <h2 className="text-[64px]">{post.title}</h2>

      {post.eyecatch?.url && (
        <div className="my-[32px]">
          <Image src={post.eyecatch.url} alt={post.title} width={800} height={600} sizes="(max-width: 768px) 100vw, 800px" priority />
        </div>
      )}

      <div>{formattedDate}</div>

      <div>
        カテゴリー：
        {categories.length
          ? categories.map((c, i) => (
              <span key={c.id}>
                {c.name}
                {i < categories.length - 1 ? ', ' : ''}
              </span>
            ))
          : 'なし'}
      </div>

      <div dangerouslySetInnerHTML={markup} />
    </>
  );
}
