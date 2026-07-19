import { Atom, BookOpenCheck, ExternalLink, FlaskConical, Route } from "lucide-react";
import { SectionHeading } from "../../../components/common/SectionHeading";

const stats = [
  { Icon: Atom, value: "17", label: "Chất Hóa học trong AR" },
  { Icon: BookOpenCheck, value: "34", label: "Mặt thẻ trước và sau" },
  { Icon: Route, value: "7", label: "Bước trong hành trình" },
  { Icon: FlaskConical, value: "4", label: "Chức năng cốt lõi" },
] as const;

const substances = ["Al", "BaCl₂", "C", "Ca", "Cu", "Fe", "H₂O", "HCl", "K", "KClO₃", "KMnO₄", "Mg", "Na", "Na₂SO₄", "NaOH", "S", "Zn"] as const;

export function SocialProofSection() {
  return (
    <section id="social-proof" aria-labelledby="social-proof-heading">
      <div className="section-wrap">
        <SectionHeading
          id="social-proof-heading"


          title={<>Một dự án giáo dục <span>có nguồn gốc rõ ràng</span></>}
          description="LABEDU được phát triển trong khuôn khổ Capstone EXE201 tại FPT University."
        />
        <div className="proof-layout reveal" data-reveal>
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
              <p>Thiết kế cho chương trình Hóa học THPT, kết hợp Flash Card thật với trải nghiệm AR trên Android.</p>
            </div>
          </article>
          <div className="proof-metrics">
            <dl className="proof-stats-grid">
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
            <div className="proof-coverage" aria-label="Danh sách 17 chất Hóa học hiện có">
              <div className="proof-coverage-heading">
                <strong>Đủ 17 chất đang có trong ứng dụng</strong>
                <span>Đối chiếu trực tiếp với thư viện Flash Card</span>
              </div>
              <div className="proof-formulas">
                {substances.map((formula) => <span key={formula}>{formula}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
