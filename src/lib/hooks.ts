import { useEffect, useState } from "react";
import { TJobItem, TJobItemContent } from "./types";
import { BASE_API_URL } from "./constants";
import { useQueries, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = window.location.hash.slice(1);
      console.log(id);
      setActiveId(+id);
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  return activeId;
}

type jobItemsApiResponse = {
  jobItems: TJobItem[];
  public: boolean;
  sorted: boolean;
};

export function useSearchQuery(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    async (): Promise<jobItemsApiResponse> => {
      const res = await fetch(`${BASE_API_URL}?search=${searchText}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.description || "Something went wrong");
      }
      return data;
    },
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false, // do not refetch on window focus
      enabled: Boolean(searchText), // only fetch when searchText is not empty
      retry: false,
      onError: (error) => {
        let message;
        if (error instanceof Error) {
          message = error.message;
        } else if (typeof error === "string") {
          message = error;
        } else {
          message = "An error occurred";
        }
        toast.error(message);
      },
    }
  );

  return {
    jobItems: data?.jobItems || [],
    isLoading: isInitialLoading,
  } as const;
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["jobItem", id],
      queryFn: async () => {
        const res = await fetch(`${BASE_API_URL}/${id}`);
        const data = await res.json();
        return data;
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false, // do not refetch on window focus
      enabled: !!id, // only fetch when id is not null
    })),
  });

  const jobItems = results
    .map((result) => result.data?.jobItem)
    // .filter((jobItem) => !!jobItem != undefined) as TJobItem[];
    .filter((jobItem) => Boolean(jobItem)) as TJobItem[];
  const isLoading = results.some((result) => result.isLoading);

  return { jobItems, isLoading };
}

export function useActiveJobItem(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["jobItem", id], // query key is an array of strings and numbers (id) to uniquely identify the query  (useQuery hook)
    async () => {
      const res = await fetch(`${BASE_API_URL}/${id}`);
      const data = await res.json();
      return data;
    },
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false, // do not refetch on window focus
      enabled: !!id, // only fetch when id is not null
    }
  );

  const activeJobItem: TJobItemContent = data?.jobItem;
  const isLoading = isInitialLoading;
  return { activeJobItem, isLoading };
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue] as const;
}

export function useOnClickOutside(
  refs: React.RefObject<HTMLElement>[],
  handler: () => void
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        refs.every(
          (ref) => ref.current && !ref.current.contains(e.target as Node)
        )
      ) {
        // !e.target.closest(".bookmarks-btn")
        // !e.target.closest(".bookmarks-popover")
        handler();
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [refs, handler]);
}
