import { ArrowRight, Check, Download, FlaskConical } from "lucide-react";
import { DOWNLOAD_URL } from "../data/content";

export function DownloadSection() {
  return (
    <section id="download" aria-labelledby="cta-heading">
      <div id="cta">
        <div className="section-wrap">
          <div className="cta-box reveal" data-reveal>
            <span className="cta-icon" aria-hidden="true"><FlaskConical size={40} /></span>
            <div className="cta-copy-block">
              <h2 className="cta-title" id="cta-heading">Sẵn sàng trải nghiệm <span>Hóa học trong AR?</span></h2>
              <p className="cta-desc">
                Tải LABEDU và bắt đầu với điện thoại Android cùng bộ Flash Card của bạn.
              </p>
              <ul className="cta-note" aria-label="Yêu cầu ứng dụng">
                <li><Check size={15} aria-hidden="true" /> Miễn phí</li>
                <li><Check size={15} aria-hidden="true" /> Android 7.0+</li>
                <li><Check size={15} aria-hidden="true" /> Cần quyền camera</li>
              </ul>
            </div>
            <div className="cta-btns">
              <a href={DOWNLOAD_URL} target="_blank" rel="noreferrer" className="btn-glow">
                <Download size={19} aria-hidden="true" /> Tải ứng dụng
              </a>
              <a href="#how" className="btn-cta-outline">
                Xem cách hoạt động <ArrowRight size={19} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
