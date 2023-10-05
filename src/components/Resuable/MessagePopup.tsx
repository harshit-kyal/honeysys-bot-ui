import React, { useState, useEffect } from "react";

const MessagePopup = ({
  content,
  display,
  setDisplay,
}: {
  content: string;
  display: boolean;
  setDisplay: any;
}) => {
  //   useEffect(() => {
  //     if (display) {
  //       setDisplay(false);
  //     }
  //   }, [display]);
  return display ? (
    <div
      className="message-popup"
      style={{
        position: "absolute",
        top: "50px",
        right: "14px",
        background: "rgb(197 252 234)",
        padding: "10px 20px",
        borderRadius: "10px",
        textAlign: "center",
        color: "darkgreen",
        display: "flex",
      }}
    >
      <img
        src="/image/check.svg"
        className="me-2"
        alt=""
        height="24"
        width="24"
      ></img>
      <h1>{content}</h1>
    </div>
  ) : (
    <></>
  );
};

export default MessagePopup;
// position: absolute;
// top: 50px;
// right: 14px;
// background: rgb(197 252 234);
// padding: 10px 20px;
// border-radius: 10px;
// text-align: center;
// color: darkgreen;
// display: flex;
