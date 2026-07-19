import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  label?: string;
  title: ReactNode;
  description: string;
};

export function SectionHeading({ id, label, title, description }: SectionHeadingProps) {
  return (
    <header className="section-header reveal" data-reveal>
      {label && (
        <>
          <div className="section-tag">{label}</div>
          <div className="section-divider" aria-hidden="true" />
        </>
      )}
      <h2 className="section-title" id={id}>
        {title}
      </h2>
      <p className="section-sub">{description}</p>
    </header>
  );
}
