import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { SectionHeading } from "../../../components/common/SectionHeading";
import { steps } from "../data/content";

export function HowItWorksSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const touchStartX = useRef(0);
  const total = steps.length;

  const goTo = (index: number) => setCurrentStep((index + total) % total);

  return (
    <section id="how" aria-labelledby="how-heading">
      <div className="section-wrap">
        <SectionHeading
          id="how-heading"
          label="Hướng dẫn sử dụng"
          title={<>Quy trình sử dụng <span>7 bước</span></>}
          description="Từ tải ứng dụng đến ôn tập — trải nghiệm đầy đủ LABEDU AR-Laboratory."
        />
        <div
          className="steps-slider reveal"
          data-reveal
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") goTo(currentStep + 1);
            if (event.key === "ArrowLeft") goTo(currentStep - 1);
          }}
        >
          <div className="steps-progress" role="tablist" aria-label="Các bước sử dụng">
            {steps.map((step, index) => (
              <div className="step-progress-item" key={step.title}>
                <button
                  type="button"
                  role="tab"
                  className={`step-dot${index === currentStep ? " active" : ""}${index < currentStep ? " done" : ""}`}
                  aria-selected={index === currentStep}
                  aria-controls={`step-panel-${index}`}
                  onClick={() => goTo(index)}
                >
                  {index + 1}
                </button>
                {index < total - 1 && <div className={`steps-progress-line${index < currentStep ? " is-done" : ""}`}><div className="steps-progress-line-fill" /></div>}
              </div>
            ))}
          </div>
          <div
            className="steps-viewport"
            onTouchStart={(event) => { touchStartX.current = event.changedTouches[0].screenX; }}
            onTouchEnd={(event) => {
              const delta = touchStartX.current - event.changedTouches[0].screenX;
              if (Math.abs(delta) > 50) goTo(currentStep + (delta > 0 ? 1 : -1));
            }}
          >
            <div className="steps-track">
              {steps.map((step, index) => (
                <div
                  className={`step-slide${index === currentStep ? " is-active" : ""}`}
                  id={`step-panel-${index}`}
                  role="tabpanel"
                  aria-hidden={index !== currentStep}
                  key={step.title}
                >
                  <div className="step-slide-inner">
                    <img src={step.image} alt={step.imageAlt} className="step-img" loading="lazy" />
                    <div className="step-label">Bước {String(index + 1).padStart(2, "0")}</div>
                    <div className="step-title">{step.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="steps-controls">
            <button type="button" className="steps-btn steps-btn-prev" onClick={() => goTo(currentStep - 1)}>
              <ArrowLeft size={17} aria-hidden="true" /> Trước
            </button>
            <div className="steps-counter" aria-live="polite"><span>{currentStep + 1}</span> / {total}</div>
            <button type="button" className="steps-btn steps-btn-next" onClick={() => goTo(currentStep + 1)}>
              Tiếp <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
