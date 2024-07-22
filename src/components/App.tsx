import Header from "./Header";
import Footer from "./Footer";
import Background from "./Background";
import Container from "./Container";
import { useState } from "react";
import { useDebounce, useJobItems } from "../lib/hooks";
import { Toaster } from "react-hot-toast";

function App() {
  //states
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const { jobItems, isLoading } = useJobItems(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);

  //derived/computed state
  const jobItemsSliced = jobItems.slice((currentPage - 1) * 7, currentPage * 7);
  const totalNumberOfResults = jobItems.length;
  const totalPages = Math.ceil(totalNumberOfResults / 7);

  const handleCHangePage = (direction: "next" | "previous") => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
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
      />
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
