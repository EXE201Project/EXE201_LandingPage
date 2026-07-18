import { ArrowRight, Check, Download, FlaskConical } from "lucide-react";
import { DOWNLOAD_URL } from "../data/content";

export function DownloadSection() {
  return (
    <section id="download" aria-labelledby="cta-heading">
      <div id="cta">
        <div className="section-wrap">
          <div className="cta-box reveal" data-reveal>
            <span className="cta-icon" aria-hidden="true"><FlaskConical size={44} /></span>
            <h2 className="cta-title" id="cta-heading">Sẵn sàng trải nghiệm<br /><span>Hóa học trong AR?</span></h2>
            <p className="cta-desc">
              Tải ứng dụng miễn phí, không cần đăng ký hay thiết bị đặc biệt.<br />
              Chỉ cần điện thoại Android và Flash Card LABEDU.
            </p>
            <div className="cta-btns">
              <a href={DOWNLOAD_URL} target="_blank" rel="noreferrer" className="btn-glow">
                <ArrowRight size={19} aria-hidden="true" /> Start Testing
              </a>
              <a href={DOWNLOAD_URL} target="_blank" rel="noreferrer" className="btn-cta-outline">
                <Download size={19} aria-hidden="true" /> Download APK
              </a>
            </div>
            <p className="cta-tagline">Trải nghiệm học Hóa học tương tác ngay hôm nay.</p>
            <ul className="cta-note" aria-label="Thông tin ứng dụng">
              <li><Check size={15} /> Miễn phí</li><li><Check size={15} /> Android</li><li><Check size={15} /> Không cần đăng ký</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
