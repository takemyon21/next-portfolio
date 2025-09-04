// works/page.tsx
import Link from 'next/link';
import { client } from '../../libs/microcms';

// ブログ記事の型定義
type Props = {
  id: string;
  title: string;
};

async function getWorksPosts(): Promise<Props[]> {
  const data = await client.get({
    endpoint: 'works', // 'works'はmicroCMSのエンドポイント名
    queries: {
      fields: 'id,title', // idとtitleを取得
      limit: 5, // 最新の5件を取得
    },
  });
  return data.contents;
}

export default async function worksList() {
  const works = await getWorksPosts();

  return (
    <>
      <h2>制作実績一覧</h2>
      <ul>
        {works.map((work) => (
          <li key={work.id}>
            <Link href={`/works/${work.id}`}>
              {' '}
              {/* 記事へのリンクを生成 */}
              {work.title} {/* タイトルを表示 */}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
