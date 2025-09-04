// app/components/Header.tsx
import React from "react";
import NavLinks from "./NavLinks";

const Header: React.FC = () => {
  return (
    <header className="fixed left-0 right-0 z-[9999]">
      <div className="max-w-[1120px] mx-auto flex justify-between items-center">
        <h1 className="text-[32px] font-bold">Take&apos;s portfolio</h1>
        <nav>
          <NavLinks />
        </nav>
      </div>
    </header>
  );
};

export default Header;
