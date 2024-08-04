import Header from "./Header";
import Footer from "./Footer";
import Background from "./Background";
import Container from "./Container";
import { useState } from "react";
import { useDebounce, useSearchQuery } from "../lib/hooks";
import { Toaster } from "react-hot-toast";
import { RESULTS_PER_PAGE } from "../lib/constants";

function App() {
  //states
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"relevant" | "recent">("relevant");

  //derived/computed state
  const JobItemsSorted =
    [...(jobItems || [])].sort((a, b) => {
      if (sortBy === "relevant") {
        return b.relevanceScore - a.relevanceScore;
      } else if (sortBy === "recent") {
        return a.daysAgo - b.daysAgo;
      }
      return 0;
    }) || [];

  const jobItemsSliced =
    JobItemsSorted?.slice(
      (currentPage - 1) * RESULTS_PER_PAGE,
      currentPage * RESULTS_PER_PAGE
    ) || [];

  const totalNumberOfResults = jobItems.length;
  const totalPages = Math.ceil(totalNumberOfResults / RESULTS_PER_PAGE);

  // event handlers /actions

  const handleCHangePage = (direction: "next" | "previous") => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleChangeSortBy = (newSortBy: "relevant" | "recent") => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  };

  return (
    <>
      <Background />
      <Header searchText={searchText} setSearchText={setSearchText} />
      <Container
        jobItems={jobItemsSliced}
        isLoading={isLoading}
        totalNumberOfResults={totalNumberOfResults}
        handleCHangePage={handleCHangePage}
        currentPage={currentPage}
        totalPages={totalPages}
        handleChangeSortBy={handleChangeSortBy}
        sortBy={sortBy}
      />
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
