import type { ReactNode } from "react";

interface HeaderProps {
  children?: ReactNode; // menü (Navigation) başlık kutusunun içinde durur
}

function Header({ children }: HeaderProps) {
  return (
    <header>
      <h1>Kampüs Etkinlikleri</h1>
      <p className="giris">Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
      {children}
    </header>
  );
}

export default Header;
