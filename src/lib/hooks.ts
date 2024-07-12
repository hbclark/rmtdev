import { useEffect, useState } from "react";
import { TJobItem, TJobItemContent } from "./types";
import { BASE_API_URL } from "./constants";

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = window.location.hash.slice(1);
      setActiveId(+id);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  return { activeId };
}

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<TJobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // console.log(jobItems);

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_API_URL}?search=${searchText}`);
        const data = await res.json();
        setIsLoading(false);
        setJobItems(data.jobItems);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [searchText]);

  return { isLoading, jobItems };
}

export function useActiveJobItem(id: number | null) {
  const [activeJobItem, setActiveJobItem] = useState<TJobItemContent | null>(
    null
  );

  useEffect(() => {
    if (!id) return;

    async function fetchDate() {
      try {
        const res = await fetch(`${BASE_API_URL}/${id}`);
        const data = await res.json();
        setActiveJobItem(data.jobItem);

        if (!res.ok) {
          console.log("Error");
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchDate();
  }, [id]);
  return activeJobItem;
}
