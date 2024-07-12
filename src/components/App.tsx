import Header from "./Header";
import Footer from "./Footer";
import Background from "./Background";
import Container from "./Container";
import { useState } from "react";
import { useJobItems } from "../lib/hooks";

function App() {
  const [searchText, setSearchText] = useState<string>("");
  const { jobItemsSliced, isLoading } = useJobItems(searchText);

  return (
    <>
      <Background />
      <Header searchText={searchText} setSearchText={setSearchText} />
      <Container jobItems={jobItemsSliced} isLoading={isLoading} />
      <Footer />
    </>
  );
}

export default App;
