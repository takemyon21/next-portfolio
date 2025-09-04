// Next.js 15 / App Router
// Cloudflare Workers (OpenNext) でそのまま動きます
export const runtime = 'nodejs'; // Workers の nodejs_compat でOK

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

async function hmacSHA256Hex(secret: string, payload: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
  return Array.from(new Uint8Array(mac))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function POST(request: Request) {
  try {
    const secret = process.env.MICROCMS_WEBHOOK_SECRET;
    if (!secret) {
      console.error('MICROCMS_WEBHOOK_SECRET is missing');
      return new Response('Server misconfigured', { status: 500 });
    }

    // microCMS の署名ヘッダ（小文字/大文字どちらでも取れるように）
    const signature = request.headers.get('x-microcms-signature') ?? request.headers.get('X-MICROCMS-Signature');
    if (!signature) return new Response('Signature required', { status: 400 });

    // 署名は **raw body** で検証する
    const raw = await request.text();
    const expected = await hmacSHA256Hex(secret, raw);

    if (!timingSafeEqual(expected, signature.toLowerCase())) {
      console.warn('Invalid signature');
      return new Response('Invalid signature', { status: 401 });
    }

    // ここまで来たら正規の Webhook
    // 必要に応じてイベント種別やコンテンツIDを参照
    const topic = request.headers.get('x-microcms-topic') ?? '';
    const body = raw ? JSON.parse(raw) : {};

    // 例) ISR 再検証（タグ運用の場合）
    // import { revalidateTag, revalidatePath } from 'next/cache';
    // revalidateTag('blog');         // タグ無効化
    // revalidatePath('/blog');       // パス無効化

    console.log('microCMS webhook ok', { topic, id: body?.id });

    return new Response('ok', { status: 200 });
  } catch (e: any) {
    console.error('Webhook error', e?.stack || e);
    return new Response('error', { status: 500 });
  }
}

export function GET() {
  // 誤爆防止
  return new Response('Method not allowed', { status: 405 });
}
