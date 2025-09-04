// about/page.tsx
import { client } from "../../libs/microcms";
import Image from "next/image";
import Link from "next/link";

// About記事の型定義
type Props = {
  title: string;
  content: string;
  publishedAt: string;
  image: { url: string };
};

// microCMSから特定の記事を取得
async function getAboutPost(): Promise<Props> {
  const data = await client.get({
    endpoint: `about`,
  });
  return data;
}

// 記事詳細ページの生成
export default async function AboutPostPage() {
  const post = await getAboutPost();

  const markup = { __html: post.content };

  return (
    <>
      <h2 className="text-[64px]">{post.title}</h2> {/* タイトルを表示 */}
      <div className="my-[32px]">
        <Image src={post.image.url} alt={post.title} width={800} height={600} sizes="(max-width: 768px) 100vw, 800px" priority />
      </div>
      {/* カテゴリーを表示 */}
      <div dangerouslySetInnerHTML={markup} /> {/* 記事本文を表示 */}
    </>
  );
}

// 静的パスを生成
export async function generateStaticParams() {
  const contentIds = await client.getAllContentIds({ endpoint: "about" });

  return contentIds.map((contentId) => ({
    id: contentId, // 各記事のIDをパラメータとして返す
  }));
}
