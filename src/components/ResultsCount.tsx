import { useDebounce } from "../lib/hooks";

export default function ResultsCount({
  totalNumberOfResults,
}: {
  totalNumberOfResults: number;
}) {
  const debouncedTotalNumberOfResults = useDebounce(totalNumberOfResults, 500);
  return (
    <p className="count">
      <strong>{debouncedTotalNumberOfResults} results</strong>
    </p>
  );
}
