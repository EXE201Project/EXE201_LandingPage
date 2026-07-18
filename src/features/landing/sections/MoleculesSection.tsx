import { ChevronLeft, ChevronRight, RotateCcw, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SectionHeading } from "../../../components/common/SectionHeading";
import { flashCards } from "../data/content";

export function MoleculesSection() {
  const [query, setQuery] = useState("");
  const [activeFormula, setActiveFormula] = useState<string>(flashCards[0].formula);
  const [showBack, setShowBack] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 699px)");
    const updatePageSize = () => {
      setPageSize(media.matches ? 6 : 8);
      setPage(1);
    };
    updatePageSize();
    media.addEventListener("change", updatePageSize);
    return () => media.removeEventListener("change", updatePageSize);
  }, []);

  const filteredCards = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("vi");
    if (!normalized) return flashCards;
    return flashCards.filter((card) =>
      (card.formula + " " + card.name).toLocaleLowerCase("vi").includes(normalized),
    );
  }, [query]);


  const pageCount = Math.max(1, Math.ceil(filteredCards.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageStart = (currentPage - 1) * pageSize;
  const pageCards = filteredCards.slice(pageStart, pageStart + pageSize);
  const visibleStart = filteredCards.length === 0 ? 0 : pageStart + 1;
  const visibleEnd = Math.min(pageStart + pageCards.length, filteredCards.length);
  const activeCard = flashCards.find((card) => card.formula === activeFormula) ?? flashCards[0];

  const chooseCard = (formula: string) => {
    setActiveFormula(formula);
    setShowBack(false);
  };

  return (
    <section id="molecules" aria-labelledby="molecules-heading">
      <div className="section-wrap">
        <SectionHeading
          id="molecules-heading"
          label="Thư viện Flash Card"
          title={<><span>17 chất Hóa học</span> trong thư viện AR</>}
          description="Chọn một thẻ để xem hình ảnh thật, sau đó lật giữa mặt trước và mặt sau."
        />

        <div className="flashcard-library reveal" data-reveal>
          <div className="flashcard-showcase">
            <div className={"flashcard-stage" + (showBack ? " is-flipped" : "")}>
              <img
                src={showBack ? activeCard.back : activeCard.front}
                alt={(showBack ? "Mặt sau" : "Mặt trước") + " Flash Card " + activeCard.name}
              />
            </div>
            <div className="flashcard-showcase-copy">
              <span>Flash Card đang chọn</span>
              <strong>{activeCard.formula}</strong>
              <p>{activeCard.name}</p>
              <button type="button" onClick={() => setShowBack((value) => !value)}>
                <RotateCcw size={17} aria-hidden="true" />
                {showBack ? "Xem mặt trước" : "Xem mặt sau"}
              </button>
            </div>
          </div>

          <div className="flashcard-browser">
            <label className="flashcard-search">
              <Search size={18} aria-hidden="true" />
              <span className="sr-only">Tìm Flash Card</span>
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                placeholder="Tìm theo công thức hoặc tên chất"
              />
            </label>
            <div className="flashcard-result-count" aria-live="polite">
              Hiển thị {visibleStart}–{visibleEnd} / {filteredCards.length} thẻ
            </div>

            {pageCards.length > 0 ? (
              <div className="flashcard-grid" role="list" aria-label={"Danh sách Flash Card, trang " + currentPage}>
                {pageCards.map((card) => (
                  <button
                    type="button"
                    role="listitem"
                    className={activeCard.formula === card.formula ? "is-active" : ""}
                    onClick={() => chooseCard(card.formula)}
                    aria-pressed={activeCard.formula === card.formula}
                    key={card.formula}
                  >
                    <img src={card.front} alt="" loading="lazy" />
                    <span><strong>{card.formula}</strong><small>{card.name}</small></span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="flashcard-empty">Không tìm thấy Flash Card phù hợp.</p>
            )}

            {pageCount > 1 && (
              <nav className="flashcard-pagination" aria-label="Phân trang Flash Card">
                <button
                  type="button"
                  className="flashcard-page-arrow"
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                  disabled={currentPage === 1}
                  aria-label="Trang trước"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <div className="flashcard-page-numbers">
                  {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                    <button
                      type="button"
                      className={currentPage === pageNumber ? "is-current" : ""}
                      onClick={() => setPage(pageNumber)}
                      aria-current={currentPage === pageNumber ? "page" : undefined}
                      aria-label={"Trang " + pageNumber}
                      key={pageNumber}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="flashcard-page-arrow"
                  onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
                  disabled={currentPage === pageCount}
                  aria-label="Trang tiếp theo"
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </nav>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
