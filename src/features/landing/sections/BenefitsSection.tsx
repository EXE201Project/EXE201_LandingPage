import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "../../../components/common/SectionHeading";
import { benefits } from "../data/content";

export function BenefitsSection() {
  return (
    <section id="benefits" aria-labelledby="benefits-heading">
      <div className="section-wrap benefit-story">
        <div className="benefit-story-intro">
          <SectionHeading
            id="benefits-heading"
            title={<>Từ công thức trên giấy đến <span>trải nghiệm có thể chạm</span></>}
            description="LABEDU không thay bài học trên lớp; ứng dụng bổ sung phần quan sát và thực hành mà sách giáo khoa khó thể hiện."
          />
          <figure className="benefit-story-visual reveal" data-reveal>
            <img src="/assets/features/ar-molecule.jpg" alt="Màn hình quan sát mô hình phân tử AR trong LABEDU" loading="lazy" />
            <figcaption>Ảnh chụp trực tiếp từ phiên bản thử nghiệm LABEDU</figcaption>
          </figure>
        </div>

        <ol className="benefit-outcomes" aria-label="Bốn lợi ích chính của LABEDU">
          {benefits.map((item, index) => (
            <li className="benefit-outcome reveal" data-reveal style={{ transitionDelay: `${index * 45}ms` }} key={item.title}>
              <span className="benefit-outcome-number">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3><CheckCircle2 size={19} aria-hidden="true" />{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}