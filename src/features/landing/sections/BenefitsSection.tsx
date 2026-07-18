import { SectionHeading } from "../../../components/common/SectionHeading";
import { benefits } from "../data/content";

export function BenefitsSection() {
  return (
    <section id="benefits" aria-labelledby="benefits-heading">
      <div className="section-wrap">
        <SectionHeading
          id="benefits-heading"
          label="Lợi ích"
          title={<>LABEDU giải quyết vấn đề <span>như thế nào?</span></>}
          description="Không chỉ là tính năng — LABEDU mang lại lợi ích thực sự cho người học."
        />
        <div className="features-grid">
          {benefits.map((item, index) => (
            <article className="feature-card benefit-card reveal" data-reveal style={{ transitionDelay: `${index * 50}ms` }} key={item.title}>
              <div className={`feat-card-icon fci-${index + 1}`}><img src={item.image} alt={item.imageAlt} loading="lazy" /></div>
              <div className="benefit-content">
                <h3 className="feat-card-title">{item.title}</h3>
                <p className="feat-card-desc">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
