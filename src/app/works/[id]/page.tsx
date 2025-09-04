// app/blog/[id]/page.tsx
import { client } from "../../../libs/microcms";
import Image from "next/image";
import dayjs from "dayjs";

// ブログ記事の型定義
type Props = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  // category: { name: string };
  category: { id: string; name: string }[];
  eyecatch: { url: string };
};

// microCMSから特定の記事を取得
async function getWorksPost(id: string): Promise<Props> {
  const data = await client.get({
    endpoint: `works/${id}`,
  });
  return data;
}

// 記事詳細ページの生成
export default async function BlogWorksPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // IDを取得
  const work = await getWorksPost(id);

  // dayjsを使ってpublishedAtをYY.MM.DD形式に変換
  const formattedDate = dayjs(work.publishedAt).format("YY.MM.DD");
  const markup = { __html: work.content };

  return (
    <>
      <h2 className="text-[64px]">{work.title}</h2> {/* タイトルを表示 */}
      <div>{formattedDate}</div> {/* 日付を表示 */}
      <div className="my-[32px]">
        <Image src={work.eyecatch.url} alt={work.title} width={800} height={600} sizes="(max-width: 768px) 100vw, 800px" priority />
      </div>
      {/* <div>カテゴリー：{work.category && work.category.name}</div> カテゴリーを表示 */}
      <div>
        カテゴリー：
        {work.category &&
          work.category.map((cat, index) => (
            <span key={cat.id}>
              {cat.name}
              {index < work.category.length - 1 ? ", " : ""}
            </span>
          ))}
      </div>{" "}
      {/* カテゴリーを表示 */}
      <div dangerouslySetInnerHTML={markup} /> {/* 記事本文を表示 */}
    </>
  );
}

// 静的パスを生成
export async function generateStaticParams() {
  const contentIds = await client.getAllContentIds({ endpoint: "works" });

  return contentIds.map((contentId) => ({
    id: contentId, // 各記事のIDをパラメータとして返す
  }));
}
