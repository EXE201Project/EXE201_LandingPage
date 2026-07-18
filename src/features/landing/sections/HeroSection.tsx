import {
  ArrowRight,
  Atom,
  Box,
  Download,
  FlaskConical,
  ScanLine,
  Sparkles,
  Trophy,
} from "lucide-react";
import { DOWNLOAD_URL } from "../data/content";

const floatingCards = [
  { className: "float-card-1", iconClass: "fci-blue", Icon: FlaskConical, title: "Thí nghiệm", sub: "Trực quan" },
  { className: "float-card-2", iconClass: "fci-cyan", Icon: Atom, title: "Phân tử 3D", sub: "AR Real-time" },
  { className: "float-card-3", iconClass: "fci-gold", Icon: Trophy, title: "Quiz", sub: "Ôn tập" },
] as const;

const highlights = [
  { Icon: Box, name: "Mô hình 3D", sub: "Sống động" },
  { Icon: ScanLine, name: "Quét & Học", sub: "Nhanh chóng" },
  { Icon: FlaskConical, name: "Thí nghiệm ảo", sub: "An toàn & thú vị" },
] as const;

export function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-title">
      <div className="hero-banner-bg" aria-hidden="true">
        <img src="/assets/brand/hero-banner.png" alt="" />
      </div>

      {floatingCards.map(({ className, iconClass, Icon, title, sub }) => (
        <div className={`float-card ${className}`} aria-hidden="true" key={title}>
          <div className={`float-card-icon ${iconClass}`}><Icon size={20} /></div>
          <div className="float-card-text">
            <div className="float-card-title">{title}</div>
            <div className="float-card-sub">{sub}</div>
          </div>
          <div className="float-card-btn"><ArrowRight size={13} /></div>
        </div>
      ))}

      <div className="hero-inner">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="badge-atom"><Atom size={14} aria-hidden="true" /></span>
            AR-Powered Chemistry Education
          </div>
          <div className="hero-title-block">
            <h1 className="hero-title" id="hero-title">
              <span className="lab">LAB</span><span className="edu">EDU</span>
            </h1>
            <div className="hero-subtitle">AR-LABORATORY</div>
            <div className="hero-subtitle-line" aria-hidden="true" />
          </div>
          <p className="hero-desc">
            Khám phá thế giới Hóa học bằng công nghệ <strong>Thực tế Tăng cường (AR)</strong>.
            Quét Flash Card, quan sát mô hình phân tử 3D, thực hiện thí nghiệm ảo và học theo cách trực quan hơn.
          </p>
          <div className="hero-cta-group">
            <a href={DOWNLOAD_URL} target="_blank" rel="noreferrer" className="btn-download">
              <Download size={18} aria-hidden="true" />
              Download APK
            </a>
            <div className="cta-hint"><Sparkles size={18} aria-hidden="true" /> Tải về và trải nghiệm ngay!</div>
          </div>
          <div className="hero-features" role="list" aria-label="Điểm nổi bật">
            {highlights.map(({ Icon, name, sub }) => (
              <div className="feat-item" role="listitem" key={name}>
                <div className="feat-icon-box"><Icon size={20} aria-hidden="true" /></div>
                <div className="feat-text"><span className="feat-name">{name}</span><span className="feat-sub">{sub}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
