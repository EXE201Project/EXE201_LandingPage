import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Brand } from "../common/Brand";
import { DOWNLOAD_URL, navigation } from "../../features/landing/data/content";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav id="navbar" className={scrolled ? "scrolled" : undefined} aria-label="Điều hướng chính">
        <Brand />
        <ul className="nav-links">
          {navigation.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
          <li>
            <a href={DOWNLOAD_URL} target="_blank" rel="noreferrer" className="nav-cta">
              <Download size={16} aria-hidden="true" />
              Tải ứng dụng
            </a>
          </li>
        </ul>
        <button
          type="button"
          className={`hamburger${menuOpen ? " open" : ""}`}
          aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      <button
        type="button"
        className={`mobile-menu-backdrop${menuOpen ? " open" : ""}`}
        aria-label="Đóng menu"
        onClick={closeMenu}
      />
      <div className={`mobile-menu${menuOpen ? " open" : ""}`} id="mobile-menu">
        <div className="mobile-menu-links">
          {navigation.map((item) => (
            <a href={item.href} onClick={closeMenu} key={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <a href={DOWNLOAD_URL} target="_blank" rel="noreferrer" className="mobile-cta" onClick={closeMenu}>
          <Download size={18} aria-hidden="true" />
          Tải ứng dụng
        </a>
      </div>
    </>
  );
}
