// app/components/Footer.tsx
import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          {/* 他のナビゲーションリンクを追加 */}
        </ul>
      </nav>

      <small>© 2025 take All rights reserved.</small>
    </footer>
  );
};

export default Footer;
