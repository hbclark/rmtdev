import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import { TJobItem } from "../lib/types";

export default function Sidebar({
  jobItems,
  isLoading,
  totalNumberOfResults,
  handleCHangePage,
  currentPage,
  totalPages,
  handleChangeSortBy,
  sortBy,
}: {
  jobItems: TJobItem[];
  isLoading: boolean;
  totalNumberOfResults: number;
  handleCHangePage: (direction: "next" | "previous") => void;
  currentPage: number;
  totalPages: number;
  handleChangeSortBy: (newSortBy: "relevant" | "recent") => void;
  sortBy: "relevant" | "recent";
}) {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount totalNumberOfResults={totalNumberOfResults} />
        <SortingControls onClick={handleChangeSortBy} sortBy={sortBy} />
      </div>
      <JobList jobItems={jobItems} isLoading={isLoading} />
      <PaginationControls
        onClick={handleCHangePage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
