import { useState } from "react";
import { useAppSelector } from "../app/hooks";

const SearchBar = ({ onClick }: { onClick: (inputText: string) => void }) => {
  const [inputText, setinputText] = useState<string>("");
  const loading = useAppSelector((state) => state.home.loading);
  const reviewToken = localStorage.getItem("reviewToken");

  return (
    <div className="fixed bottom-0 left-0">
      <div
        className="flex h-[45px] w-full items-center  border-t border-b-2 border-[#E6E6E6]"
        style={{
          boxShadow: "0px -4px 8px 0px rgba(0, 0, 0, 0.12)",
        }}
      >
        <input
          disabled={reviewToken ? true : false}
          id="search"
          type="text"
          value={inputText}
          className="h-[45px] text-sm placeholder:text-xs active:outline-none hover:outline-none focus:outline-none placeholder:text-[#969696] placeholder:font-normal ps-3"
          placeholder='Try searching "Laptops & Electronics"'
          style={{ width: "calc(100vw - 45px)" }}
          onChange={(e) => {
            setinputText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputText !== "" && !loading) {
              onClick(inputText);
              setinputText("");
            }
          }}
        />
        <div className="h-[45px] w-[45px] flex-shrink-0 bg-primary flex justify-center items-center">
          <img
            src="/images/send1.svg"
            alt="send"
            className="h-6 w-6"
            onClick={(e) => {
              if (inputText !== "" && !loading) {
                onClick(inputText);
                setinputText("");
                document.getElementById("search")!.focus();
              }
            }}
          />
        </div>
      </div>
      <div className="h-5 w-screen bg-background"></div>
    </div>
  );
};

export default SearchBar;
