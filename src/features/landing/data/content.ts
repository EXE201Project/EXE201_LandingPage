import type { ImageContentItem, NavigationItem, StepItem, Testimonial } from "../types";

export const DOWNLOAD_URL = "https://play.google.com/apps/internaltest/4701604803919893584";

export const navigation: NavigationItem[] = [
  { label: "Tính năng", href: "#features" },
  { label: "Cách dùng", href: "#how" },
  { label: "Phân tử", href: "#molecules" },
];

export const footerLinks: NavigationItem[] = [
  ...navigation,
  { label: "Phản hồi", href: "#testimonials" },
];

export const problems: ImageContentItem[] = [
  {
    title: "Khó hình dung phân tử 3D",
    description:
      "Cấu trúc phân tử, liên kết và góc liên kết khó được mô tả đầy đủ trên giấy, khiến học sinh khó hình dung không gian thực.",
    image: "/assets/learning/issue-3d.png",
    imageAlt: "Mô hình minh họa cấu trúc phân tử 3D",
  },
  {
    title: "Thiếu cơ hội thực hành",
    description:
      "Phòng thí nghiệm không phải lúc nào cũng sẵn sàng, chi phí cao và tiềm ẩn rủi ro an toàn khi thực hành.",
    image: "/assets/learning/issue-practice.png",
    imageAlt: "Học sinh thực hành trong phòng thí nghiệm",
  },
  {
    title: "Học từ sách dễ nhàm chán",
    description:
      "Phương pháp học một chiều khiến học sinh mất hứng thú, khó duy trì sự tập trung trong thời gian dài.",
    image: "/assets/learning/issue-book.png",
    imageAlt: "Sách giáo khoa Hóa học",
  },
  {
    title: "Khó ghi nhớ khái niệm",
    description:
      "Công thức, phản ứng và khái niệm trừu tượng khó được ghi nhớ lâu dài nếu thiếu trải nghiệm trực quan.",
    image: "/assets/learning/issue-concepts.png",
    imageAlt: "Các khái niệm Hóa học trừu tượng",
  },
];

export const benefits: ImageContentItem[] = [
  {
    title: "Học Hóa học qua mô hình 3D",
    description:
      "Nhìn thấy cấu trúc phân tử trong không gian thực qua AR — xoay, phóng to và quan sát từ mọi góc độ, giúp hiểu sâu hơn hình vẽ 2D.",
    image: "/assets/learning/benefit-3d.png",
    imageAlt: "Mô hình phân tử 3D trong ứng dụng LABEDU",
  },
  {
    title: "Thí nghiệm ảo an toàn",
    description:
      "Thực hành không giới hạn trong môi trường ảo, không lo hóa chất nguy hiểm hay thiếu dụng cụ phòng lab.",
    image: "/assets/learning/benefit-safety.png",
    imageAlt: "Môi trường thí nghiệm Hóa học an toàn",
  },
  {
    title: "Flash Card tương tác",
    description:
      "Học chủ động bằng cách quét thẻ — mỗi Flash Card kích hoạt nội dung AR, biến việc ôn tập thành trải nghiệm sống động.",
    image: "/assets/learning/benefit-flashcard.png",
    imageAlt: "Flash Card tương tác của LABEDU",
  },
  {
    title: "Tăng hứng thú học tập",
    description:
      "Gắn kết hơn với môn Hóa nhờ công nghệ AR — học sinh tích cực khám phá thay vì tiếp nhận thụ động từ sách vở.",
    image: "/assets/learning/benefit-engagement.png",
    imageAlt: "Học sinh hứng thú khám phá Hóa học",
  },
];

export const productFeatures: ImageContentItem[] = [
  {
    title: "Xem phân tử AR",
    description:
      "Quét Flash Card để hiển thị mô hình phân tử 3D trực tiếp trong không gian thực. Xoay, phóng to và khám phá cấu trúc nguyên tử.",
    image: "/assets/features/ar-molecule.jpg",
    imageAlt: "Màn hình xem phân tử AR trong LABEDU",
    linkLabel: "Xem quy trình",
  },
  {
    title: "Thí nghiệm ảo",
    description:
      "Thực hiện thí nghiệm Hóa học an toàn trong môi trường AR và quan sát phản ứng theo thời gian thực mà không cần phòng lab.",
    image: "/assets/features/virtual-lab.jpg",
    imageAlt: "Màn hình thí nghiệm ảo trong LABEDU",
    linkLabel: "Khám phá quy trình",
  },
  {
    title: "Flash Card tương tác",
    description:
      "Mỗi thẻ chứa thông tin phân tử, công thức Hóa học và hình ảnh 3D tương tác để biến việc ôn tập thành khám phá.",
    image: "/assets/features/flashcard.jpg",
    imageAlt: "Màn hình Flash Card tương tác trong LABEDU",
    linkLabel: "Xem cách quét thẻ",
  },
  {
    title: "Quiz ôn tập",
    description:
      "Tự kiểm tra kiến thức sau mỗi bài học, theo dõi trình độ và nhận ra nội dung cần ôn lại.",
    image: "/assets/features/quiz.jpg",
    imageAlt: "Màn hình Quiz ôn tập trong LABEDU",
    linkLabel: "Xem quy trình ôn tập",
  },
];

export const steps: StepItem[] = [
  { title: "Tải ứng dụng", image: "/assets/steps/01-download.jpg", imageAlt: "Trang tải ứng dụng LABEDU" },
  { title: "Mở LABEDU", image: "/assets/steps/02-home.jpg", imageAlt: "Màn hình chính LABEDU" },
  { title: "Quét Flash Card", image: "/assets/steps/03-scan.jpg", imageAlt: "Quét Flash Card bằng camera" },
  { title: "Khám phá mô hình AR", image: "/assets/steps/04-explore-ar.jpg", imageAlt: "Khám phá mô hình phân tử AR 3D" },
  { title: "Thí nghiệm ảo", image: "/assets/steps/05-virtual-lab.jpg", imageAlt: "Thực hiện thí nghiệm ảo trong AR" },
  { title: "Làm Quiz ôn tập", image: "/assets/steps/06-quiz.jpg", imageAlt: "Làm Quiz ôn tập Hóa học" },
  { title: "Theo dõi tiến độ", image: "/assets/steps/07-progress.jpg", imageAlt: "Theo dõi tiến độ học tập" },
];

export const molecules = [
  ["Al", "Nhôm"], ["BaCl₂", "Bari clorua"], ["C", "Cacbon"], ["Ca", "Canxi"],
  ["Cu", "Đồng"], ["Fe", "Sắt"], ["H₂O", "Nước"], ["HCl", "Axit Clohidric"],
  ["K", "Kali"], ["KClO₃", "Kali clorat"], ["KMnO₄", "Kali pemanganat"],
  ["Mg", "Magie"], ["Na", "Natri"], ["Na₂SO₄", "Natri sunfat"],
  ["S", "Lưu huỳnh"], ["Zn", "Kẽm"],
] as const;

export const testimonials: Testimonial[] = [
  {
    role: "Giáo viên",
    quote: "LABEDU giúp học sinh hình dung Hóa học dễ dàng hơn rất nhiều. Mô hình AR trực quan hơn hẳn so với hình vẽ trên bảng.",
    initials: "PH",
    name: "ThS. Phạm Hải",
    meta: "Giảng viên Hóa học – THPT",
  },
  {
    role: "Học sinh",
    quote: "Học Hóa bằng AR thú vị hơn nhiều so với đọc sách giáo khoa. Quét Flash Card là thấy phân tử 3D hiện ra ngay — rất ấn tượng!",
    initials: "TN",
    name: "Trần Ngọc",
    meta: "Học sinh THPT – TP.HCM",
  },
  {
    role: "Người đánh giá",
    quote: "Một dự án giáo dục sáng tạo với giá trị thực tiễn rõ ràng. Ứng dụng AR vào Hóa học là hướng đi đúng cho EdTech hiện nay.",
    initials: "GV",
    name: "Ban Giám Khảo",
    meta: "Đánh giá dự án Capstone – FPT University",
  },
];
