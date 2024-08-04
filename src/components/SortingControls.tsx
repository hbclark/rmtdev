export default function Sorting({
  onClick,
  sortBy,
}: {
  onClick: (newSortBy: "relevant" | "recent") => void;
  sortBy: "relevant" | "recent";
}) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton
        sortBy={"relevant"}
        onClick={() => onClick("relevant")}
        isActive={sortBy === "relevant"}
      />
      <SortingButton
        sortBy={"recent"}
        onClick={() => onClick("recent")}
        isActive={sortBy === "recent"}
      />
    </section>
  );
}
type SortingButtonProps = {
  sortBy: "relevant" | "recent";
  onClick: () => void;
  isActive: boolean;
};

function SortingButton({ sortBy, onClick, isActive }: SortingButtonProps) {
  return (
    <button
      className={`sorting__button sorting__button--recent ${
        isActive ? "sorting__button--active" : ""
      } `}
      onClick={onClick}
    >
      {sortBy === "relevant" ? "Relevant" : "Recent"}
    </button>
  );
}
