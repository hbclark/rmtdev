import { TJobItem } from "../lib/types";
import JobItemContent from "./JobItemContent";
import Sidebar from "./Sidebar";

export default function Container({
  jobItems,
  isLoading,
}: {
  jobItems: TJobItem[];
  isLoading: boolean;
}) {
  return (
    <div className="container">
      <Sidebar jobItems={jobItems} isLoading={isLoading} />
      <JobItemContent />
    </div>
  );
}
