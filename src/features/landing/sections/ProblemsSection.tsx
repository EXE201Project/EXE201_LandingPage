import { SectionHeading } from "../../../components/common/SectionHeading";
import { problems } from "../data/content";

export function ProblemsSection() {
  return (
    <section id="problem" aria-labelledby="problem-heading">
      <div className="section-wrap">
        <SectionHeading
          id="problem-heading"


          title={<>Học Hóa <span>khó ở điểm nào?</span></>}
          description="Kiến thức thường dừng ở công thức và hình vẽ, trong khi học sinh cần được nhìn và tự mình thử."
        />
        <div className="features-grid">
          {problems.map((item, index) => {
            return (
              <article className="problem-card reveal" data-reveal style={{ transitionDelay: `${index * 50}ms` }} key={item.title}>
                <div className="problem-icon">
                  <img src={item.image} alt={item.imageAlt} loading="lazy" />
                </div>
                <div className="problem-content">
                  <h3 className="problem-title">{item.title}</h3>
                  <p className="problem-desc">{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
