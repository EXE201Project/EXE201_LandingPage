import { Atom, BookOpenCheck, ExternalLink, GraduationCap } from "lucide-react";
import { SectionHeading } from "../../../components/common/SectionHeading";

const stats = [
  { Icon: Atom, value: "17", label: "Chất Hóa học trong AR" },
  { Icon: BookOpenCheck, value: "34", label: "Mặt Flash Card thật" },
  { Icon: GraduationCap, value: "EXE201", label: "Dự án Capstone" },
] as const;

export function SocialProofSection() {
  return (
    <section id="social-proof" aria-labelledby="social-proof-heading">
      <div className="section-wrap">
        <SectionHeading
          id="social-proof-heading"
          title={<>Dự án Capstone từ <span>FPT University</span></>}
          description="LABEDU được phát triển trong học phần EXE201 cho chương trình Hóa học THPT."
        />
        <div className="proof-layout proof-layout-compact reveal" data-reveal>
          <article className="proof-project-card">
            <figure className="proof-project-media">
              <img src="/assets/brand/fpt-campus-hcm-optimized.jpg" alt="Campus Trường Đại học FPT tại Thành phố Hồ Chí Minh" loading="lazy" />
              <figcaption>
                <a href="https://daihoc.fpt.edu.vn/hcm/" target="_blank" rel="noreferrer">
                  Ảnh: FPT University <ExternalLink size={13} aria-hidden="true" />
                </a>
              </figcaption>
            </figure>
            <div className="proof-project-content">
              <p className="proof-project-eyebrow">FPT UNIVERSITY</p>
              <h3>Sản phẩm của sinh viên FPT University</h3>
              <p>Flash Card thật kết hợp trải nghiệm AR trên điện thoại Android.</p>
            </div>
          </article>
          <dl className="proof-stats-grid proof-stats-compact">
            {stats.map(({ Icon, value, label }) => (
              <div className="proof-stat-card" key={label}>
                <Icon size={24} aria-hidden="true" />
                <div>
                  <dd className="proof-stat-num">{value}</dd>
                  <dt className="proof-stat-label">{label}</dt>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
