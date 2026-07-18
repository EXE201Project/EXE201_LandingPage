type BrandProps = {
  variant?: "header" | "footer";
};

export function Brand({ variant = "header" }: BrandProps) {
  const isFooter = variant === "footer";

  return (
    <a
      href="#top"
      className={isFooter ? "footer-brand" : "nav-brand"}
      aria-label="Về đầu trang LABEDU"
    >
      <img
        src="/assets/brand/logo.png"
        alt=""
        className={isFooter ? undefined : "nav-brand-logo"}
      />
      <span className={isFooter ? "footer-brand-text" : "nav-brand-text"}>
        <span className={isFooter ? "footer-brand-name" : "nav-brand-name"}>
          <span>LAB</span>EDU
        </span>
        <span className={isFooter ? "footer-brand-sub" : "nav-brand-sub"}>
          AR-LABORATORY
        </span>
      </span>
    </a>
  );
}
