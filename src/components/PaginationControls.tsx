import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export default function Pagination({
  onClick,
  currentPage,
  totalPages,
}: {
  onClick: (direction: "next" | "previous") => void;
  currentPage: number;
  totalPages: number;
}) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          direction={"previous"}
          currentPage={currentPage}
          onClick={() => onClick("previous")}
        />
      )}
      {currentPage < totalPages && (
        <PaginationButton
          direction={"next"}
          currentPage={currentPage}
          onClick={() => onClick("next")}
        />
      )}
    </section>
  );
}

type PaginationButtonProps = {
  onClick: () => void;
  direction: "next" | "previous";
  currentPage: number;
};

function PaginationButton({
  onClick,
  direction,
  currentPage,
}: PaginationButtonProps) {
  return (
    <button
      className={`pagination__button pagination__button--${direction}`}
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}
    >
      {direction === "previous" && (
        <>
          <ArrowLeftIcon /> Page {currentPage - 1}
        </>
      )}
      {direction === "next" && (
        <>
          Page {currentPage + 1} <ArrowRightIcon />
        </>
      )}
    </button>
  );
}
