import {
  ArrowRight,
  Atom,
  Check,
  Download,
  FlaskConical,
  ScanLine,
} from "lucide-react";
import { HeroMoleculeScene } from "../components/HeroMoleculeScene";
import { DOWNLOAD_URL } from "../data/content";

const highlights = [
  { Icon: ScanLine, label: "Quét Flash Card" },
  { Icon: Atom, label: "Khám phá mô hình 3D" },
  { Icon: FlaskConical, label: "Thí nghiệm an toàn" },
] as const;

export function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-title">
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />

      <div className="hero-inner hero-system-grid">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="badge-atom"><Atom size={15} aria-hidden="true" /></span>
            AR-Laboratory dành cho Hóa học THPT
          </div>

          <h1 className="hero-title hero-system-title" id="hero-title">
            Học Hóa học trong <span>không gian</span>
          </h1>
          <p className="hero-desc hero-system-desc">
            Quét Flash Card để quan sát phân tử 3D, thực hành thí nghiệm ảo và củng cố kiến thức ngay trên điện thoại Android.
          </p>

          <div className="hero-cta-group hero-system-actions">
            <a href={DOWNLOAD_URL} target="_blank" rel="noreferrer" className="btn-download">
              <Download size={18} aria-hidden="true" />
              Tải ứng dụng
            </a>
            <a href="#how" className="btn-hero-secondary">
              Xem cách hoạt động <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>

          <ul className="hero-trust-list" aria-label="Yêu cầu trải nghiệm">
            <li><Check size={16} aria-hidden="true" /> Android 7.0+</li>
            <li><Check size={16} aria-hidden="true" /> Camera</li>
            <li><Check size={16} aria-hidden="true" /> Flash Card LABEDU</li>
          </ul>

          <div className="hero-features hero-system-features" role="list" aria-label="Điểm nổi bật">
            {highlights.map(({ Icon, label }) => (
              <div className="feat-item" role="listitem" key={label}>
                <div className="feat-icon-box"><Icon size={19} aria-hidden="true" /></div>
                <span className="feat-name">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-product-stage">
          <div className="hero-stage-depth">
            <HeroMoleculeScene />
          </div>
        </div>
      </div>
    </section>
  );
}
