import Header from "./Header";
import Footer from "./Footer";
import Background from "./Background";
import Container from "./Container";
import { useState } from "react";
import { useActiveId, useActiveJobItem, useJobItems } from "../lib/hooks";

function App() {
  const [searchText, setSearchText] = useState<string>("");
  const { jobItems, isLoading } = useJobItems(searchText);
  const jobItemsSliced = jobItems.slice(0, 7);
  const { activeId } = useActiveId();
  const { activeJobItem } = useActiveJobItem(activeId);

  return (
    <>
      <Background />
      <Header searchText={searchText} setSearchText={setSearchText} />
      <Container
        jobItems={jobItemsSliced}
        isLoading={isLoading}
        jobItemContent={activeJobItem}
      />
      <Footer />
    </>
  );
}

export default App;
