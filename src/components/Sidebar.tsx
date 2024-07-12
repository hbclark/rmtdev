import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import { TJobItem } from "../lib/types";

export default function Sidebar({
  jobItems,
  isLoading,
}: {
  jobItems: TJobItem[];
  isLoading: boolean;
}) {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount />
        <SortingControls />
      </div>
      <JobList jobItems={jobItems} isLoading={isLoading} />
      <PaginationControls />
    </div>
  );
}
