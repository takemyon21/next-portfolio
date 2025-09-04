import Script from 'next/script';

// app/not-found.tsx
export default async function NotFound() {
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

      <Script id="live2dcubismcore" src="/live2dsdk/Samples/TypeScript/Demo/dist/Core/live2dcubismcore.js"></Script>
      <Script id="live2d_index" type="module" src="/live2dsdk/Samples/TypeScript/Demo/dist/assets/index-BZY1jVSQ.js" strategy="afterInteractive"></Script>
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
