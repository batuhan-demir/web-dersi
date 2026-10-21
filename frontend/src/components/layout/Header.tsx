import type { ReactNode } from "react";

interface HeaderProps {
  title: string;
  text?: string;
  children?: ReactNode; // menü (Navigation) başlık kutusunun içinde durur
}

function Header({ title, text, children }: HeaderProps) {
  return (
    <header>
      <h1>{title}</h1>
      {text && <p className="giris">{text}</p>}
      {children}
    </header>
  );
}

export default Header;
