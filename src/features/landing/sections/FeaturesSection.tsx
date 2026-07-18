import { ArrowDown, ArrowRight, BrainCircuit, FlaskConical, ScanLine } from "lucide-react";
import { SectionHeading } from "../../../components/common/SectionHeading";

const learningFlow = [
  {
    number: "01",
    Icon: ScanLine,
    title: "Quét Flash Card",
    description: "Đưa thẻ vào khung camera để LABEDU nhận diện chất Hóa học.",
    image: "/assets/features/flashcard.jpg",
    imageAlt: "Bộ Flash Card thật của LABEDU",
  },
  {
    number: "02",
    Icon: FlaskConical,
    title: "Khám phá và thí nghiệm",
    description: "Quan sát mô hình AR, xoay cấu trúc và thử phản ứng trong môi trường ảo.",
    image: "/assets/features/ar-molecule.jpg",
    imageAlt: "Màn hình khám phá phân tử AR trong LABEDU",
  },
  {
    number: "03",
    Icon: BrainCircuit,
    title: "Làm Quiz và ôn tập",
    description: "Trả lời câu hỏi ngắn để kiểm tra kiến thức ngay sau trải nghiệm.",
    image: "/assets/features/quiz.jpg",
    imageAlt: "Màn hình Quiz thật trong LABEDU",
  },
] as const;

export function FeaturesSection() {
  return (
    <section id="features" aria-labelledby="features-heading">
      <div className="section-wrap">
        <SectionHeading
          id="features-heading"
          label="Tính năng nổi bật"
          title={<>Một hành trình học tập <span>liền mạch</span></>}
          description="Ba bước nối thẻ vật lý với trải nghiệm AR và bài ôn tập."
        />

        <ol className="learning-flow reveal" data-reveal aria-label="Ba bước trải nghiệm chính">
          {learningFlow.map(({ number, Icon, title, description, image, imageAlt }, index) => (
            <li className="learning-flow-item" key={number}>
              <article className="learning-flow-card">
                <div className="learning-flow-heading">
                  <span className="learning-flow-number">{number}</span>
                  <span className="learning-flow-icon"><Icon size={18} aria-hidden="true" /></span>
                  <h3>{title}</h3>
                </div>
                <p>{description}</p>
                <div className="learning-flow-media">
                  <img src={image} alt={imageAlt} loading="lazy" />
                  <span>Ảnh thật sản phẩm</span>
                </div>
              </article>
              {index < learningFlow.length - 1 && (
                <span className="learning-flow-arrow" aria-hidden="true">
                  <ArrowRight className="flow-arrow-desktop" size={22} />
                  <ArrowDown className="flow-arrow-mobile" size={22} />
                </span>
              )}
            </li>
          ))}
        </ol>

        <a href="#how" className="learning-flow-link">
          Xem đầy đủ 7 bước sử dụng <ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
