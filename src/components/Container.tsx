import { TJobItem } from "../lib/types";
import JobItemContent from "./JobItemContent";
import Sidebar from "./Sidebar";

export default function Container({
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
    <div className="container">
      <Sidebar
        jobItems={jobItems}
        isLoading={isLoading}
        totalNumberOfResults={totalNumberOfResults}
        handleCHangePage={handleCHangePage}
        currentPage={currentPage}
        totalPages={totalPages}
        handleChangeSortBy={handleChangeSortBy}
        sortBy={sortBy}
      />
      <JobItemContent />
    </div>
  );
}
