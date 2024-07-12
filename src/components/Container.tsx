import { TJobItem, TJobItemContent } from "../lib/types";
import JobItemContent from "./JobItemContent";
import Sidebar from "./Sidebar";

export default function Container({
  jobItems,
  isLoading,
  jobItemContent,
}: {
  jobItems: TJobItem[];
  isLoading: boolean;
  jobItemContent: TJobItemContent | null;
}) {
  return (
    <div className="container">
      <Sidebar jobItems={jobItems} isLoading={isLoading} />
      <JobItemContent jobItemContent={jobItemContent} />
    </div>
  );
}
