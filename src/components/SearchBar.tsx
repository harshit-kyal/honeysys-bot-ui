import React, { useState } from "react";
import { Input } from "@polynomialai/alpha-react";

const SearchBar = ({ onClick }: { onClick: (inputText: string) => void }) => {
  const [inputText, setinputText] = useState<string>("");

  return (
    <div className="fixed bottom-0 left-0">
      <div
        className="flex h-[45px] w-full items-center  border-t border-b-2 border-[#E6E6E6]"
        style={{
          boxShadow: "0px -4px 8px 0px rgba(0, 0, 0, 0.12)",
        }}
      >
        <input
          type="text"
          value={inputText}
          className="h-[45px] text-sm placeholder:text-xs active:outline-none hover:outline-none focus:outline-none placeholder:text-[#969696] placeholder:font-normal ps-5"
          placeholder='Try searching "Laptops & Electronics"'
          style={{ width: "calc(100vw - 45px)" }}
          onChange={(e) => {
            setinputText(e.target.value);
          }}
        />
        <div className="h-[45px] w-[45px] flex-shrink-0">
          <img
            src="/images/send.svg"
            alt="send"
            className="h-full w-full"
            onClick={() => {
              onClick(inputText);
              setinputText("");
            }}
          />
        </div>
      </div>
      <div className="h-5 w-screen bg-background"></div>
    </div>
  );
};

export default SearchBar;