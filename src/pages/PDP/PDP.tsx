import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { useParams } from "react-router-dom";
import { Text } from "@polynomialai/alpha-react";
import Dropdown from "../../components/Resuable/Dropdown";
import ActionButton from "../../components/Resuable/ActionButton";

const PDP = () => {
  const { id } = useParams();
  const [Data, setData] = useState<any>({});
  const [activePrice, setActivePrice] = useState<any>();
  const [DropdownOption, setDropdownOption] = useState<any>([]);

  const ProductData: any = {
    "1": {
      imageSrc: "/images/onion.svg",
      price: 3500,
      title: "Fresh Onion",
      description:
        "Our onions are sourced from the most reputable farms, ensuring top-notch quality and freshness in every bulb.",
      pricing: [
        { id: "1", option: "500 g", price: 60, qty: 0 },
        { id: "2", option: "1 kg", price: 120, qty: 0 },
        { id: "3", option: "2 kg", price: 240, qty: 0 },
        { id: "4", option: "5 kg", price: 600, qty: 0 },
      ],
    },
  };

  useEffect(() => {
    if (id) {
      setData(ProductData[id]);
      setActivePrice(ProductData[id]?.pricing[0]);
      setDropdownOption([
        ...ProductData[id]?.pricing.map((item: any) => item.option),
      ]);
    }
  }, []);

  const onChange = (value: string) => {
    const pricing = Data.pricing.find((item: any) => item.option === value);
    setActivePrice(pricing);
  };

  const addItem = () => {
    let DataCopy: any = JSON.parse(JSON.stringify(Data));
    let pricingCopy: any[] = [...DataCopy.pricing];

    pricingCopy = pricingCopy?.map((item: any) => {
      if (item.id === activePrice?.id) {
        setActivePrice(item);
        return { ...item, qty: ++item.qty };
      }
      return item;
    });
    DataCopy.pricing = pricingCopy;
    setData(DataCopy);
  };

  const removeItem = () => {
    let DataCopy: any = JSON.parse(JSON.stringify(Data));
    let pricingCopy: any[] = [...DataCopy.pricing];

    pricingCopy = pricingCopy?.map((item: any) => {
      if (item.id === activePrice?.id) {
        setActivePrice(item);
        return { ...item, qty: --item.qty };
      }
      return item;
    });
    DataCopy.pricing = pricingCopy;
    setData(DataCopy);
  };

  return (
    <div className="h-screen pt-[60px]">
      {/* header */}
      <PageHeader title={`${Data.title} (${activePrice?.option})`} />
      {/* Product Image */}
      <div className="flex justify-center">
        <img
          src={Data.imageSrc}
          alt="Product_Image"
          height={"45vh"}
          className="h-auto sm:!h-[45vh]"
        />
      </div>
      {/* Detail Section */}
      <div
        className="px-5 pb-5 mt-4 flex flex-col justify-between"
        style={{ height: "calc(55vh - 76px)" }}
      >
        {/* Title, Dropdown, Description  */}
        <div>
          <div className="flex gap-5">
            <Text type="title" size="lg" className="font-semibold">
              {Data.title}
            </Text>
            <Dropdown
              option={DropdownOption}
              onChange={onChange}
              selected={activePrice?.option}
            />
          </div>
          <Text type="body" size="lg" className="mt-6">
            {Data.description}
          </Text>
        </div>
        {/* Add Buttons */}
        <div className="flex">
          {/* + or -  */}
          {activePrice?.qty > 0 && (
            <div className="flex w-[45%] gap-1 justify-evenly">
              <img
                src="/images/minus.svg"
                alt="minus"
                height={41}
                className="flex-shrink-0 h-[41px] w-[41px] "
                onClick={removeItem}
              />
              <div className="h-[41px] w-[41px] flex-shrink-0 rounded border border-[#E6E6E6] flex justify-center items-center">
                <Text type="body" size="md" className="font-medium">
                  {activePrice?.qty}
                </Text>
              </div>
              <img
                src="/images/plus.svg"
                alt="minus"
                height={41}
                className="flex-shrink-0 h-[41px] w-[41px]"
                onClick={addItem}
              />
            </div>
          )}
          {/* main button */}
          <div
            style={{
              width: activePrice?.qty > 0 ? "55%" : "100%",
            }}
          >
            <ActionButton
              className="bg-primary text-white rounded-md gap-3 h-[41px]"
              src="/images/shopping.svg"
              text={`₹ ${activePrice?.price?.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
              onClick={addItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDP;
