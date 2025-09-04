// app/page.tsx
import Link from "next/link";
import { client } from "../libs/microcms";
import FvSwiper from "./components/FvSwiper";
import FvSwiper2 from "./components/FvSwiper2";

// ブログ記事の型定義
type Props = {
  id: string;
  title: string;
};

// microCMSからブログ記事を取得
async function getBlogPosts(): Promise<Props[]> {
  const data = await client.get({
    endpoint: "blog", // 'blog'はmicroCMSのエンドポイント名
    queries: {
      fields: "id,title", // idとtitleを取得
      limit: 5, // 最新の5件を取得
    },
  });
  return data.contents;
}

async function getBloWorks(): Promise<Props[]> {
  const data = await client.get({
    endpoint: "works", // 'works'はmicroCMSのエンドポイント名
    queries: {
      fields: "id,title", // idとtitleを取得
      limit: 5, // 最新の5件を取得
    },
  });
  return data.contents;
}

export default async function Home() {
  const posts = await getBlogPosts();
  const works = await getBloWorks();

  return (
    <>
      <div className="fv h-[600px] relative overflow-hidden mt-[-72px]">
        <div className="flex justify-end items-center h-full mr-[40px]">
          <FvSwiper />
          <FvSwiper2 />
        </div>

        <div className="fv__text-contents absolute top-[50%] left-[10%] translate-y-[-50%]">
          <p className="text-[40px] font-[500] tracking-tight leading-[1.5]">Take Web Coder</p>
          <p className="text-[14px] text-[#666] flex justify-start items-center gap-[16px] before:w-[30%] before:h-[1px] before:bg-[#666]">Welcome to my portfolio site!</p>
        </div>
      </div>

      <section className="blog__section">
        <div className="inner ">
          <h2>ブログ記事一覧</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <Link href={`/blog/${post.id}`}>
                  {" "}
                  {/* 記事へのリンクを生成 */}
                  {post.title} {/* タイトルを表示 */}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="works__section">
        <div className="inner ">
          <h2>制作実績一覧</h2>
          <ul>
            {works.map((work) => (
              <li key={work.id}>
                <Link href={`/works/${work.id}`}>
                  {" "}
                  {/* 記事へのリンクを生成 */}
                  {work.title} {/* タイトルを表示 */}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
