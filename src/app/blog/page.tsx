// works/page.tsx
import Link from 'next/link';
import { client } from '../../libs/microcms';

// ブログ記事の型定義
type Props = {
  id: string;
  title: string;
};

async function getBlogPosts(): Promise<Props[]> {
  const data = await client.get({
    endpoint: 'blog', // 'works'はmicroCMSのエンドポイント名
    queries: {
      fields: 'id,title', // idとtitleを取得
      limit: 5, // 最新の5件を取得
    },
  });
  return data.contents;
}

export default async function blogList() {
  const blogs = await getBlogPosts();

  return (
    <>
      <h2>制作実績一覧</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              {' '}
              {/* 記事へのリンクを生成 */}
              {blog.title} {/* タイトルを表示 */}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
