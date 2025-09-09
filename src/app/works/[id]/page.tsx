// app/works/[id]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import dayjs from 'dayjs';

type Category = { id: string; name: string };
type Eyecatch = { url: string };
type WorksPost = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  category?: Category[];
  eyecatch?: Eyecatch;
};

// 必要な環境変数を読み込み（未設定なら直ちに明示エラー）
const { MICROCMS_SERVICE_DOMAIN, MICROCMS_API_KEY } = process.env;
if (!MICROCMS_SERVICE_DOMAIN || !MICROCMS_API_KEY) {
  throw new Error('Required env vars are missing: MICROCMS_SERVICE_DOMAIN and/or MICROCMS_API_KEY.');
}

// 404 は必ず notFound() を“返す”。throw しない。
async function fetchWorksPost(id: string): Promise<WorksPost> {
  const url = `https://${MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/works/${encodeURIComponent(id)}`;

  const res = await fetch(url, {
    headers: { 'X-MICROCMS-API-KEY': MICROCMS_API_KEY },
    // 開発中に毎回取りたい場合のみ:
    // cache: "no-store",
    // ISR したい場合のみ:
    // next: { revalidate: 60 },
  });

  if (res.status === 404) {
    // ここで関数を終了させる（throw ではなく return notFound()）
    return notFound();
  }
  if (!res.ok) {
    // 本当の障害のみ 500 扱い
    throw new Error(`microCMS error: ${res.status}`);
  }
  return (await res.json()) as WorksPost;
}

// 一部環境で params が Promise になる事例があるため両対応
export default async function Page(props: { params: { id: string } | Promise<{ id: string }> }) {
  const params = typeof (props.params as any)?.then === 'function' ? await (props.params as Promise<{ id: string }>) : (props.params as { id: string });

  const post = await fetchWorksPost(params.id); // ここに来る時点で 404 は notFound() 済み

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
