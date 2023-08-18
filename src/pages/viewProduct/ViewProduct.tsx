import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { useParams } from "react-router-dom";
import {
  ProductCard,
  // DrawerModal,
} from "@polynomialai/alpha-react";
import { LeafyVegetables } from "../../constants/HomeConst";
import BadgeCard from "../../components/Resuable/BadgeCard";

const ViewProduct = () => {
  const { id } = useParams();
  const [Data, setData] = useState<any>({});
  const [activePrice, setActivePrice] = useState<any>();
  const [DropdownOption, setDropdownOption] = useState<any>([]);

  // const ProductData: any = {
  //   "1": {
  //     imageSrc: "/images/onion.svg",
  //     title: "Fresh Cauliflower",
  //     pricing: [
  //       { id: "1", option: "500 g", price: 60 },
  //       { id: "2", option: "1 kg", price: 120 },
  //       { id: "3", option: "2 kg", price: 240 },
  //       { id: "4", option: "5 kg", price: 600 },
  //     ],
  //   },
  // };

  // useEffect(() => {
  //   if (id) {
  //     setData(ProductData[id]);
  //     setActivePrice(ProductData[id]?.pricing[0]);
  //     setDropdownOption([
  //       ...ProductData[id]?.pricing.map((item: any) => item.option),
  //     ]);
  //   }
  // }, []);

  // const onChange = (value: string) => {
  //   const pricing = Data.pricing.find((item: any) => item.option === value);
  //   setActivePrice(pricing);
  // };

  // const addItem = () => {
  //   let DataCopy: any = JSON.parse(JSON.stringify(Data));
  //   let pricingCopy: any[] = [...DataCopy.pricing];

  //   pricingCopy = pricingCopy?.map((item: any) => {
  //     if (item.id === activePrice?.id) {
  //       setActivePrice(item);
  //       return { ...item, qty: ++item.qty };
  //     }
  //     return item;
  //   });
  //   DataCopy.pricing = pricingCopy;
  //   setData(DataCopy);
  // };

  // const removeItem = () => {
  //   let DataCopy: any = JSON.parse(JSON.stringify(Data));
  //   let pricingCopy: any[] = [...DataCopy.pricing];

  //   pricingCopy = pricingCopy?.map((item: any) => {
  //     if (item.id === activePrice?.id) {
  //       setActivePrice(item);
  //       return { ...item, qty: --item.qty };
  //     }
  //     return item;
  //   });
  //   DataCopy.pricing = pricingCopy;
  //   setData(DataCopy);
  // };

  const AddBtn = () => {
    return (
      <div className="flex flex-col items-center">
        <div
          style={{
            backgroundColor: "#DFE0DF",
            borderRadius: 4,
            color: "black",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 400,
            objectFit: "cover",
            padding: "5px 15px",
          }}
        >
          + Add
        </div>
        <div
          style={{
            color: "#09215B",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 400,
          }}
        >
          Customize
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen pt-[60px]">
      {/* header */}
      <PageHeader title={`Leafy Vegetables`} />
      {/* Detail Section */}
      <div className="pb-12">
        {Array.from({ length: 5 }).map(() => (
          <ProductCard
            addBtn={<AddBtn />}
            className="w-full my-[6px] mb-3 px-5"
            image={
              <img
                src={LeafyVegetables.imageSrc}
                className="object-cover rounded-lg w-[60px] h-[60px]"
                alt=""
              />
            }
            onClick={() => {}}
            title={LeafyVegetables.title}
          />
        ))}
      </div>
      <div className="flex w-full px-5 py-2 bg-[#F1F1F1] gap-3 fixed bottom-0 overflow-x-auto">
        <BadgeCard text="Back to category selection" active={false} />
        <BadgeCard text="Electronics for you" active={false} />
        {/* className="flex-shrink-0 bg-background border border-primary" */}
      </div>
      {/* <DrawerModal /> */}
    </div>
  );
};

export default ViewProduct;
