import type { ImageContentItem, NavigationItem, StepItem, Testimonial } from "../types";

export const DOWNLOAD_URL = "https://play.google.com/apps/internaltest/4701604803919893584";

export const navigation: NavigationItem[] = [
  { label: "Trải nghiệm", href: "#features" },
  { label: "Cách sử dụng", href: "#how" },
  { label: "Bộ Flash Card", href: "#molecules" },
];

export const footerLinks: NavigationItem[] = [
  ...navigation,
  { label: "Phản hồi", href: "#testimonials" },
];

export const problems: ImageContentItem[] = [
  {
    title: "Khó hình dung phân tử 3D",
    description:
      "Từ hình vẽ phẳng trên sách, học sinh khó hình dung cấu trúc, góc liên kết và cách phân tử tồn tại trong không gian.",
    image: "/assets/learning/real/issue-visualization.jpg",
    imageAlt: "Học sinh quan sát thí nghiệm Hóa học trong phòng lab",
  },
  {
    title: "Thiếu cơ hội thực hành",
    description:
      "Không phải trường học nào cũng có đủ phòng lab, dụng cụ và thời gian để mỗi học sinh tự tay thực hành.",
    image: "/assets/learning/real/issue-practice.jpg",
    imageAlt: "Hai học sinh cùng thực hành với dụng cụ phòng lab",
  },
  {
    title: "Học từ sách dễ nhàm chán",
    description:
      "Khi bài học chỉ có chữ và công thức, học sinh dễ mất tập trung và khó liên hệ kiến thức với hiện tượng thật.",
    image: "/assets/learning/real/issue-theory.jpg",
    imageAlt: "Học sinh đọc sách và ghi chép trong lớp học",
  },
  {
    title: "Khó ghi nhớ khái niệm",
    description:
      "Công thức và phản ứng khó ở lại lâu nếu người học chưa được quan sát, trao đổi và tự mình thử nghiệm.",
    image: "/assets/learning/real/issue-memory.jpg",
    imageAlt: "Nhóm học sinh trao đổi trong một tiết học Hóa học",
  },
];

export const benefits: ImageContentItem[] = [
  {
    title: "Quan sát phân tử trong không gian",
    description:
      "Quét Flash Card để mở mô hình AR, sau đó xoay và phóng to cấu trúc ngay trên màn hình.",
    image: "/assets/features/ar-molecule.jpg",
    imageAlt: "Màn hình xem phân tử AR thật trong LABEDU",
  },
  {
    title: "Thử phản ứng không cần phòng lab",
    description:
      "Thực hiện từng bước trong môi trường ảo và quan sát kết quả mà không tiếp xúc với hóa chất.",
    image: "/assets/features/virtual-lab.jpg",
    imageAlt: "Màn hình thí nghiệm ảo thật trong LABEDU",
  },
  {
    title: "Bắt đầu từ Flash Card thật",
    description:
      "Mỗi thẻ nối một chất Hóa học với nội dung AR tương ứng, giúp việc học có điểm bắt đầu rõ ràng.",
    image: "/assets/features/flashcard.jpg",
    imageAlt: "Bộ Flash Card thật của LABEDU",
  },
  {
    title: "Ôn lại ngay sau trải nghiệm",
    description:
      "Làm Quiz ngắn để kiểm tra phần vừa học và biết nội dung nào cần xem lại.",
    image: "/assets/features/quiz.jpg",
    imageAlt: "Màn hình Quiz thật trong LABEDU",
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

export const flashCards = [
  { formula: "Al", name: "Nhôm", front: "/assets/flashcards/front-al.jpg", back: "/assets/flashcards/back-al.jpg" },
  { formula: "BaCl₂", name: "Bari clorua", front: "/assets/flashcards/front-bacl2.jpg", back: "/assets/flashcards/back-bacl2.jpg" },
  { formula: "C", name: "Cacbon", front: "/assets/flashcards/front-cacbon.jpg", back: "/assets/flashcards/back-cacbon.jpg" },
  { formula: "Ca", name: "Canxi", front: "/assets/flashcards/front-ca.jpg", back: "/assets/flashcards/back-ca.jpg" },
  { formula: "Cu", name: "Đồng", front: "/assets/flashcards/front-cu.jpg", back: "/assets/flashcards/back-cu.jpg" },
  { formula: "Fe", name: "Sắt", front: "/assets/flashcards/front-fe.jpg", back: "/assets/flashcards/back-fe.jpg" },
  { formula: "H₂O", name: "Nước", front: "/assets/flashcards/front-h2o.jpg", back: "/assets/flashcards/back-h2o.jpg" },
  { formula: "HCl", name: "Axit clohidric", front: "/assets/flashcards/front-hcl.jpg", back: "/assets/flashcards/back-hcl.jpg" },
  { formula: "K", name: "Kali", front: "/assets/flashcards/front-k.jpg", back: "/assets/flashcards/back-k.jpg" },
  { formula: "KClO₃", name: "Kali clorat", front: "/assets/flashcards/front-kclo3.jpg", back: "/assets/flashcards/back-kclo3.jpg" },
  { formula: "KMnO₄", name: "Kali pemanganat", front: "/assets/flashcards/front-kmno4.jpg", back: "/assets/flashcards/back-kmno4.jpg" },
  { formula: "Mg", name: "Magie", front: "/assets/flashcards/front-mg.jpg", back: "/assets/flashcards/back-mg.jpg" },
  { formula: "Na", name: "Natri", front: "/assets/flashcards/front-na.jpg", back: "/assets/flashcards/back-na.jpg" },
  { formula: "Na₂SO₄", name: "Natri sunfat", front: "/assets/flashcards/front-na2so4.jpg", back: "/assets/flashcards/back-na2so4.jpg" },
  { formula: "NaOH", name: "Natri hiđroxit", front: "/assets/flashcards/front-naoh.jpg", back: "/assets/flashcards/back-naoh.jpg" },
  { formula: "S", name: "Lưu huỳnh", front: "/assets/flashcards/front-s.jpg", back: "/assets/flashcards/back-s.jpg" },
  { formula: "Zn", name: "Kẽm", front: "/assets/flashcards/front-zn.jpg", back: "/assets/flashcards/back-zn.jpg" },
] as const;
