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
}: {
  jobItems: TJobItem[];
  isLoading: boolean;
  totalNumberOfResults: number;
  handleCHangePage: (direction: "next" | "previous") => void;
  currentPage: number;
  totalPages: number;
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
      />
      <JobItemContent />
    </div>
  );
}
