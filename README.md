# LABEDU Landing Page

Landing page giới thiệu LABEDU AR-LABORATORY, được xây dựng bằng React, TypeScript và Vite.

## Chạy dự án

```bash
npm install
npm run dev
```

Kiểm tra production:

```bash
npm run lint
npm run build
npm run preview
```

## Kiến trúc

```text
src/
├── app/                    # Composition root
├── components/
│   ├── common/             # UI dùng lại
│   └── layout/             # Header, footer
├── features/landing/
│   ├── components/         # Page composition
│   ├── data/               # Nội dung typed, URL và asset mapping
│   ├── hooks/              # Hành vi dùng chung của landing page
│   ├── sections/           # Từng section độc lập
│   └── types.ts            # Domain types của landing page
└── styles/                 # Token và global responsive styles
```

Ảnh tĩnh nằm trong `public/assets`, chia theo brand, feature, learning và step. Icon giao diện chỉ dùng từ `lucide-react`; không dùng emoji làm icon.
