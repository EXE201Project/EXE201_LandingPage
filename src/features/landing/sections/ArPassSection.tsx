import { BadgeCheck, ScanLine, Sparkles, Wallet } from "lucide-react";
import { SectionHeading } from "../../../components/common/SectionHeading";

const BANK_ACCOUNT = "1031285717";
const BANK_HOLDER = "NGUYEN HOAI AN";
const TRANSFER_NOTE = "LABEDU AR30";
const QR_IMAGE_URL = `https://img.vietqr.io/image/970436-${BANK_ACCOUNT}-compact2.png?amount=139000&addInfo=${encodeURIComponent(TRANSFER_NOTE)}&accountName=${encodeURIComponent(BANK_HOLDER)}`;

const perks = [
  {
    icon: Wallet,
    text: "Nhận ngay 139K trong ví LABEDU — sẵn sàng mở khóa nội dung bạn thích.",
  },
  {
    icon: Sparkles,
    text: "Trọn quyền khám phá mô hình phân tử AR và thí nghiệm ảo trong 30 ngày.",
  },
  {
    icon: BadgeCheck,
    text: "Quiz ôn tập và theo dõi tiến độ không giới hạn trong suốt thời gian gói.",
  },
] as const;

const paySteps = [
  "Mở app ngân hàng bất kỳ và quét mã QR — số tiền 139.000đ đã được điền sẵn.",
  `Giữ nội dung chuyển khoản "${TRANSFER_NOTE}" kèm số điện thoại bạn đăng ký LABEDU.`,
  "Mở LABEDU — 139K và gói AR 30 ngày tự động kích hoạt trong tài khoản của bạn.",
] as const;

export function ArPassSection() {
  return (
    <section id="ar-pass" aria-labelledby="ar-pass-heading">
      <div className="section-wrap">
        <SectionHeading
          id="ar-pass-heading"
          label="Gói AR Pass"
          title={<>30 ngày phòng lab AR <span>chỉ với một lần quét</span></>}
          description="Quét mã, chuyển 139.000đ — cả phòng thí nghiệm Hóa học nằm gọn trong điện thoại của bạn suốt 30 ngày."
        />

        <div className="arpass-grid reveal" data-reveal>
          <div className="arpass-copy">
            <div className="arpass-price">
              <strong>139.000đ</strong>
              <span>/ 30 ngày</span>
            </div>
            <ul className="arpass-perks">
              {perks.map(({ icon: Icon, text }) => (
                <li key={text}>
                  <span className="arpass-perk-icon" aria-hidden="true"><Icon size={18} /></span>
                  {text}
                </li>
              ))}
            </ul>
            <ol className="arpass-steps" aria-label="Các bước thanh toán">
              {paySteps.map((step, index) => (
                <li key={step}>
                  <span aria-hidden="true">{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="arpass-qr-card">
            <div className="arpass-qr-head">
              <ScanLine size={18} aria-hidden="true" />
              Quét để kích hoạt AR 30 ngày
            </div>
            <img
              className="arpass-qr-img"
              src={QR_IMAGE_URL}
              alt={`Mã VietQR chuyển 139.000đ tới tài khoản Vietcombank ${BANK_ACCOUNT} (${BANK_HOLDER})`}
              loading="lazy"
            />
            <dl className="arpass-qr-meta">
              <div><dt>Ngân hàng</dt><dd>Vietcombank</dd></div>
              <div><dt>Chủ tài khoản</dt><dd>{BANK_HOLDER}</dd></div>
              <div><dt>Số tài khoản</dt><dd>{BANK_ACCOUNT}</dd></div>
              <div><dt>Nội dung</dt><dd>{TRANSFER_NOTE} + SĐT của bạn</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
