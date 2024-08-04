import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";
import { useContext } from "react";

type BookmarkIconProps = {
  id: number;
};
export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error(
      "useBookmarks must be used within a BookmarksContextProvider"
    );
  }
  const { bookmarkedIds, handleToggleBookmark } = context;
  return (
    <button className="bookmark-btn">
      <BookmarkFilledIcon
        className={`${bookmarkedIds.includes(id) ? "filled" : ""}`}
        onClick={(e) => {
          handleToggleBookmark(id);
          e.stopPropagation();
          e.preventDefault();
        }}
      />
    </button>
  );
}
