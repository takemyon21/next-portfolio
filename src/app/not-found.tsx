// app/not-found.tsx
'use client';
import { useEffect } from 'react';
import Script from 'next/script';

// app/not-found.tsx
export default function NotFound() {
  useEffect(() => {
    const PRELOAD_ID = 'preload-live2d-on-404';
    const href = '/live2dSdk/Samples/TypeScript/Demo/dist/assets/index-BZY1jVSQ.js';

    // 既に同じIDのpreloadがあれば追加しない
    if (!document.getElementById(PRELOAD_ID)) {
      const link = document.createElement('link');
      link.id = PRELOAD_ID;
      link.rel = 'preload';
      link.as = 'script';
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }

    // 404ページを離れたらpreloadを除去（404限定表示にしたい場合）
    return () => {
      const exist = document.getElementById(PRELOAD_ID);
      if (exist) exist.remove();
    };
  }, []);

  return (
    <>
      <h2>404</h2>
      <p>ページが見つかりませんでした</p>

      <div id="live2d_canvas" className="w-full h-[350px] relative grid justify-center items-end select-none overflow-hidden [&>canvas]:w-[300px] [&>canvas]:h-[500px]">
        {/* Live2Dのキャンバスがここに挿入されます */}
        <p className="speech-bubble w-[300px] text-center absolute top-[80px] left-[50%] transform translate-[-50%] opacity-0 [&.is-active]:opacity-100 transition-[opacity] duration-600">なるみやぱんだだよ！</p>
        <p className="speech-bubble w-[300px] text-center absolute top-[80px] left-[50%] transform translate-[-50%] opacity-0 [&.is-active]:opacity-100 transition-[opacity] duration-600">あなたも道に迷ったの？？</p>
        <p className="speech-bubble w-[300px] text-center absolute top-[80px] left-[50%] transform translate-[-50%] opacity-0 [&.is-active]:opacity-100 transition-[opacity] duration-600">ここにはコンテンツはないみたいだよ？</p>
        <p className="speech-bubble w-[300px] text-center absolute top-[80px] left-[50%] transform translate-[-50%] opacity-0 [&.is-active]:opacity-100 transition-[opacity] duration-600">トップページに戻るリンクがあるから、</p>
        <p className="speech-bubble w-[300px] text-center absolute top-[80px] left-[50%] transform translate-[-50%] opacity-0 [&.is-active]:opacity-100 transition-[opacity] duration-600">そこからかえってみてね。</p>
      </div>

      <Script id="live2dcubismcore" src="/live2dSdk/Samples/TypeScript/Demo/dist/Core/live2dcubismcore.js"></Script>
      <Script id="live2d_index" type="module" src="/live2dSdk/Samples/TypeScript/Demo/dist/assets/index-BZY1jVSQ.js" crossOrigin="anonymous" strategy="afterInteractive"></Script>
      <Script id="my-custom-script" strategy="afterInteractive">
        {`
          const bubbles = document.querySelectorAll(".speech-bubble");
          let index = 0;

          function showNextBubble() {
            // すべて非表示に戻す
            bubbles.forEach(b => b.classList.remove("is-active"));

            // 対象を表示
            if (index < bubbles.length) {
              setTimeout(() => {
                bubbles[index].classList.add("is-active");
                index++;
                setTimeout(showNextBubble, 4000); // 4秒ごとに切り替え
              }, 600); // 0.6秒後に表示
            } else {
              index = 0;
              showNextBubble();
            }
          }
          showNextBubble();
        `}
      </Script>
    </>
  );
}
