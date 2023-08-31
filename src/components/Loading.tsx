const Loading = () => {
  return (
    <div className="flex items-end px-5" id="loading">
      <div className="flex justify-center items-center w-14 h-10 mx-0 my-2 bg-[#f0f1f1] rounded-xl">
        <div className="typingIndicatorBubbleDot"></div>
        <div className="typingIndicatorBubbleDot"></div>
        <div className="typingIndicatorBubbleDot"></div>
      </div>
    </div>
  );
};

export default Loading;
