const PlusButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="h-6 w-6" onClick={onClick}>
      <img src="/images/plus.svg" height={"100%"} alt="plus" />
    </div>
  );
};

export default PlusButton;
