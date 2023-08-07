import React from "react";

interface ChatWrapperProps {
  type: "bot" | "user";
  children: JSX.Element;
}

const ChatWrapper = ({ type, children }: ChatWrapperProps) => {
  return (
    <div
      className="w-full flex px-5 py-2"
      style={{ justifyContent: type === "bot" ? "start" : "end" }}
    >
      {children}
    </div>
  );
};

export default ChatWrapper;
