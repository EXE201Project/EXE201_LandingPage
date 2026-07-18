import { SectionHeading } from "../../../components/common/SectionHeading";
import { problems } from "../data/content";

export function ProblemsSection() {
  return (
    <section id="problem" aria-labelledby="problem-heading">
      <div className="section-wrap">
        <SectionHeading
          id="problem-heading"
          label="Vấn đề học tập"
          title={<>Tại sao học Hóa học <span>truyền thống</span> khó khăn?</>}
          description="Nhiều học sinh gặp khó khăn khi tiếp cận Hóa học qua sách giáo khoa và bảng đen."
        />
        <div className="features-grid">
          {problems.map((item, index) => (
            <article className="problem-card reveal" data-reveal style={{ transitionDelay: `${index * 50}ms` }} key={item.title}>
              <div className="problem-icon"><img src={item.image} alt={item.imageAlt} loading="lazy" /></div>
              <div className="problem-content">
                <h3 className="problem-title">{item.title}</h3>
                <p className="problem-desc">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
