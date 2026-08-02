import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "../../../components/common/SectionHeading";
import { steps } from "../data/content";

const stepDescriptions = [
  "Cài đặt phiên bản LABEDU dành cho thiết bị Android.",
  "Mở ứng dụng và sẵn sàng bắt đầu hành trình học tập.",
  "Đưa camera tới Flash Card để nhận diện nội dung Hóa học.",
  "Quan sát và tương tác với mô hình phân tử trong không gian.",
  "Theo dõi phản ứng và thao tác với thí nghiệm mô phỏng.",
  "Trả lời câu hỏi để củng cố kiến thức vừa trải nghiệm.",
  "Xem lại kết quả và xác định nội dung cần ôn tập.",
] as const;

export function HowItWorksSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const touchStartX = useRef(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const total = steps.length;

  const goTo = (index: number) => setCurrentStep(Math.max(0, Math.min(total - 1, index)));

  const focusStep = (index: number) => {
    const nextIndex = Math.max(0, Math.min(total - 1, index));
    goTo(nextIndex);
    window.requestAnimationFrame(() => tabRefs.current[nextIndex]?.focus());
  };

  useEffect(() => {
    const progress = progressRef.current;
    const activeTab = progress?.querySelector<HTMLElement>(
      '[role="tab"][aria-selected="true"]',
    );
    if (!progress || !activeTab) return;

    const centeredLeft = activeTab.offsetLeft - (progress.clientWidth - activeTab.offsetWidth) / 2;
    progress.scrollTo({ left: Math.max(0, centeredLeft), behavior: "smooth" });
  }, [currentStep]);

  const getPosition = (index: number) => {
    if (index === currentStep) return "is-active";
    if (index === currentStep - 1) return "is-prev";
    if (index === currentStep + 1) return "is-next";
    return "is-hidden";
  };

  return (
    <section id="how" aria-labelledby="how-heading">
      <div className="section-wrap">
        <SectionHeading
          id="how-heading"
          title={<>Hành trình trải nghiệm <span>LABEDU</span></>}
          description="Đi từng bước từ cài đặt, quét thẻ đến ôn tập; chỉ xem chi tiết khi bạn cần."
        />

        <div
          className="steps-slider journey-stage reveal"
          data-reveal
        >
          <div className="steps-progress journey-progress" role="tablist" aria-label="Các bước sử dụng" ref={progressRef}>
            {steps.map((step, index) => (
              <div className="step-progress-item" key={step.title}>
                <button
                  type="button"
                  role="tab"
                  id={`step-tab-${index}`}
                  ref={(node) => { tabRefs.current[index] = node; }}
                  className={`step-dot${index === currentStep ? " active" : ""}${index < currentStep ? " done" : ""}`}
                  aria-selected={index === currentStep}
                  aria-controls={index === currentStep ? "journey-active-panel" : undefined}
                  aria-label={`Bước ${index + 1}: ${step.title}`}
                  onClick={() => goTo(index)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowRight") { event.preventDefault(); focusStep(currentStep + 1); }
                    if (event.key === "ArrowLeft") { event.preventDefault(); focusStep(currentStep - 1); }
                    if (event.key === "Home") { event.preventDefault(); focusStep(0); }
                    if (event.key === "End") { event.preventDefault(); focusStep(total - 1); }
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
                <span className="step-progress-label">{step.title}</span>
                {index < total - 1 && (
                  <div className={`steps-progress-line${index < currentStep ? " is-done" : ""}`}>
                    <div className="steps-progress-line-fill" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div
            className="journey-viewport"
            onTouchStart={(event) => { touchStartX.current = event.changedTouches[0].screenX; }}
            onTouchEnd={(event) => {
              const delta = touchStartX.current - event.changedTouches[0].screenX;
              if (Math.abs(delta) > 50) goTo(currentStep + (delta > 0 ? 1 : -1));
            }}
          >
            {steps.map((step, index) => {
              const position = getPosition(index);
              if (position === "is-hidden") return null;

              if (position !== "is-active") {
                return (
                  <button
                    type="button"
                    className={`journey-preview ${position}`}
                    onClick={() => goTo(index)}
                    aria-label={`Chuyển đến bước ${index + 1}: ${step.title}`}
                    key={step.title}
                  >
                    <img src={step.image} alt="" loading="lazy" />
                    <span>{step.title}</span>
                  </button>
                );
              }

              return (
                <article
                  className="journey-active"
                  id="journey-active-panel"
                  role="tabpanel"
                  aria-labelledby={`step-tab-${index}`}
                  aria-live="polite"
                  key={step.title}
                >
                  <div className="journey-active-copy">
                    <span>Bước {String(index + 1).padStart(2, "0")}</span>
                    <h3>{step.title}</h3>
                    <p>{stepDescriptions[index]}</p>
                  </div>
                  <div className="journey-active-media">
                    <img src={step.image} alt="" aria-hidden="true" className="journey-media-backdrop" />
                    <img src={step.image} alt={step.imageAlt} className="journey-media-main" />
                  </div>
                </article>
              );
            })}
          </div>

          <div className="steps-controls journey-controls">
            <button type="button" className="steps-btn steps-btn-prev" onClick={() => goTo(currentStep - 1)} disabled={currentStep === 0}>
              <ArrowLeft size={17} aria-hidden="true" /> Trước
            </button>
            <div className="steps-counter" aria-live="polite"><span>{currentStep + 1}</span> / {total}</div>
            <button type="button" className="steps-btn steps-btn-next" onClick={() => goTo(currentStep + 1)} disabled={currentStep === total - 1}>
              Tiếp <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
