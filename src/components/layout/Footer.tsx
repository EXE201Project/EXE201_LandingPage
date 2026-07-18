import { Brand } from "../common/Brand";
import { DOWNLOAD_URL, footerLinks } from "../../features/landing/data/content";

export function Footer() {
  return (
    <footer>
      <Brand variant="footer" />
      <nav className="footer-links" aria-label="Điều hướng cuối trang">
        {footerLinks.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
        <a href={DOWNLOAD_URL} target="_blank" rel="noreferrer">
          Download
        </a>
      </nav>
      <div className="footer-copy">© 2026 LABEDU – EXE201 FPT University</div>
    </footer>
  );
}
