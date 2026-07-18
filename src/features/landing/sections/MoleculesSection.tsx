import { SectionHeading } from "../../../components/common/SectionHeading";
import { molecules } from "../data/content";

export function MoleculesSection() {
  return (
    <section id="molecules" aria-labelledby="molecules-heading">
      <div className="section-wrap">
        <SectionHeading
          id="molecules-heading"
          label="Thư viện Flash Card"
          title={<><span>16+ chất Hóa học</span> trong thư viện AR</>}
          description="Mỗi Flash Card kích hoạt mô hình AR 3D tương ứng — quét thẻ và khám phá ngay."
        />
        <ul className="molecule-chips reveal" data-reveal aria-label="Danh sách chất Hóa học">
          {molecules.map(([formula, name]) => (
            <li className="mol-chip" key={formula}><span className="formula">{formula}</span> {name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
