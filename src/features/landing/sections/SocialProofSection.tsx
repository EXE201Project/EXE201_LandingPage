import { Atom, BookOpen, GraduationCap, Trophy } from "lucide-react";
import { SectionHeading } from "../../../components/common/SectionHeading";

const badges = [
  { Icon: GraduationCap, label: "Phát triển bởi sinh viên FPT University" },
  { Icon: Trophy, label: "Dự án Capstone EXE201" },
  { Icon: BookOpen, label: "Thiết kế cho Hóa học THPT" },
  { Icon: Atom, label: "Công nghệ AR tiên tiến" },
] as const;

const stats = [
  ["16", "Flash Cards"],
  ["16", "Mô hình AR"],
  ["4", "Tính năng chính"],
  ["100%", "Học tập tương tác"],
] as const;

export function SocialProofSection() {
  return (
    <section id="social-proof" aria-labelledby="social-proof-heading">
      <div className="section-wrap">
        <SectionHeading
          id="social-proof-heading"
          label="Độ tin cậy"
          title={<>Dự án giáo dục <span>đáng tin cậy</span></>}
          description="LABEDU được phát triển bởi sinh viên FPT University, hướng tới giáo dục Hóa học THPT."
        />
        <div className="proof-badges reveal" data-reveal>
          {badges.map(({ Icon, label }) => <div className="proof-badge" key={label}><Icon size={20} aria-hidden="true" /> {label}</div>)}
        </div>
        <dl className="proof-stats-grid reveal" data-reveal>
          {stats.map(([value, label]) => (
            <div className="proof-stat-card" key={label}>
              <dd className="proof-stat-num">{value}</dd>
              <dt className="proof-stat-label">{label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
