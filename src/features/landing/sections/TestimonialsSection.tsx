import { SectionHeading } from "../../../components/common/SectionHeading";
import { testimonials } from "../data/content";
import type { Testimonial } from "../types";

function TestimonialCard({ item, index }: { item: Testimonial; index: number }) {
  return (
    <article
      className="feature-card testimonial-card reveal"
      data-reveal
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <span className="testimonial-role-tag">{item.role}</span>
      <blockquote className="testimonial-quote">“{item.quote}”</blockquote>
      <div className="testimonial-author">
        <div className={`testimonial-avatar ta-${index + 1}`} aria-hidden="true">{item.initials}</div>
        <div><div className="testimonial-name">{item.name}</div><div className="testimonial-meta">{item.meta}</div></div>
      </div>
    </article>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading">
      <div className="section-wrap">
        <SectionHeading
          id="testimonials-heading"
          label="Phản hồi"
          title={<>Ý kiến từ <span>người dùng</span></>}
          description="Phản hồi từ giáo viên, học sinh và người đánh giá dự án."
        />
        <div className="features-grid">
          {testimonials.map((item, index) => <TestimonialCard item={item} index={index} key={item.name} />)}
        </div>
      </div>
    </section>
  );
}
