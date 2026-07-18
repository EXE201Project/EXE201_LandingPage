import { ArrowRight } from "lucide-react";
import { SectionHeading } from "../../../components/common/SectionHeading";
import { productFeatures } from "../data/content";

export function FeaturesSection() {
  return (
    <section id="features" aria-labelledby="features-heading">
      <div className="section-wrap">
        <SectionHeading
          id="features-heading"
          label="Tính năng nổi bật"
          title={<>Học Hóa học theo cách <span>hoàn toàn mới</span></>}
          description="Công nghệ AR giúp bạn học trực quan, thực hành an toàn và ôn tập hiệu quả hơn."
        />
        <div className="features-grid">
          {productFeatures.map((item, index) => (
            <article className="feature-card reveal" data-reveal style={{ transitionDelay: `${index * 50}ms` }} key={item.title}>
              <div className={`feat-card-icon fci-${index + 1}`}><img src={item.image} alt={item.imageAlt} loading="lazy" /></div>
              <div className="feature-content">
                <h3 className="feat-card-title">{item.title}</h3>
                <p className="feat-card-desc">{item.description}</p>
                <a href="#how" className="feat-card-link">{item.linkLabel}<ArrowRight size={15} aria-hidden="true" /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
