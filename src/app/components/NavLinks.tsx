// app/components/NavLinks.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex justify-center items-center gap-[16px]">
      {[
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/works", label: "Works" },
        { href: "/blog", label: "Blog" },
      ].map(({ href, label }) => (
        <li key={href}>
          <Link href={href} aria-current={pathname === href ? "page" : undefined} className={pathname === href ? "font-bold underline" : ""}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
