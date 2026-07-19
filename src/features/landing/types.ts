export type NavigationItem = {
  label: string;
  href: string;
};

export type ImageContentItem = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  linkLabel?: string;
};

export type StepItem = {
  title: string;
  image: string;
  imageAlt: string;
};

export type Testimonial = {
  role: string;
  quote: string;
  initials: string;
  name: string;
  meta: string;
};
