import { TJobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

export function JobList({
  jobItems,
  isLoading,
}: {
  jobItems: TJobItem[];
  isLoading: boolean;
}) {
  return (
    <>
      <ul className="job-list">
        {isLoading ? <Spinner /> : null}
        {!isLoading &&
          jobItems.map((jobItem) => (
            <>
              <JobListItem key={jobItem.id} jobItem={jobItem} />
            </>
          ))}
      </ul>
    </>
  );
}

export default JobList;
