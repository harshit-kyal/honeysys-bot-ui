import { DropDown } from "@polynomialai/alpha-react";

const Dropdown = ({
  option,
  selected,
  onChange,
  optionWidth,
}: {
  option: any;
  selected: string;
  onChange: (value: string) => void;
  optionWidth?: any;
}) => {
  return (
    <DropDown
      buttonTextCN="text-sm text-black"
      buttonCN="gap-[10px] border-0 !shadow-none border-b border-primary rounded-none p-0 ps-1 pb-2 mt-1 min-w-[70px]"
      onChange={onChange}
      options={option}
      selected={selected}
      optionsContainerCN={`${
        optionWidth ? ` w-[${optionWidth}]` : "w-[150px]"
      }`}
    />
  );
};

export default Dropdown;
