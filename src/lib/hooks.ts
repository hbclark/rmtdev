import { useEffect, useState } from "react";
import { TJobItem } from "./types";

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<TJobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const jobItemsSliced = jobItems.slice(0, 7);

  // console.log(jobItems);

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
        );
        const data = await res.json();
        setIsLoading(false);
        setJobItems(data.jobItems);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [searchText]);

  return { isLoading, jobItemsSliced };
}
