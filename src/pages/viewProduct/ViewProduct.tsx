import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { useParams } from "react-router-dom";
import { Button, DrawerModal, ProductCard } from "@polynomialai/alpha-react";
import { LeafyVegetables } from "../../constants/HomeConst";
import BadgeCard from "../../components/Resuable/BadgeCard";

const ViewProduct = () => {
  const { id } = useParams();
  const [Modal, setModal] = useState<boolean>(false);

  const ProductData: { imageSrc: string; title: string; pricing: any[] } = {
    imageSrc: "/images/onion.svg",
    title: "Fresh Cauliflower",
    pricing: [
      { id: "1", option: "500 g", price: 60 },
      { id: "2", option: "1 kg", price: 120 },
      { id: "3", option: "2 kg", price: 240 },
      { id: "4", option: "5 kg", price: 600 },
    ],
  };

  const AddBtn = () => {
    return (
      <div
        className="flex flex-col items-center"
        onClick={() => {
          setModal(true);
        }}
      >
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
      </div>
      <DrawerModal
        isOpen={Modal}
        onClose={() => {
          setModal(false);
        }}
      >
        <div>
          {ProductData?.pricing.map((item: any, index: number) => (
            <ProductCard
              key={item.id + index}
              image={
                <img
                  src={ProductData?.imageSrc}
                  alt="Product_Image"
                  className="h-[60px] w-[60px] !rounded-md"
                />
              }
              title={`${ProductData?.title} - ${item?.option}`}
              price={`₹ ${item?.price}`}
              className="gap-[10%]"
              addBtn={
                <input
                  type="radio"
                  id="html"
                  name="fav_language"
                  value="HTML"
                  className="w-[24px] h-[24px] border-2 bg-[#505050] !opacity-100 shadow-none focus-visible:outline-none checked:bg-primary checked:hover:bg-primary checked:active:bg-primary checked:focus:bg-primary focus:bg-primary focus:outline-none focus:ring-primary"
                  onClick={() => {}}
                />
              }
            />
          ))}
          <div className="flex justify-center gap-5 mt-5">
            <Button
              type="secondary"
              className="border-[#C90303] text-[#C90303] py-4 w-full"
              onClick={() => {
                setModal(false);
              }}
            >
              Cancel
            </Button>
            <Button className="!bg-primary text-white py-4 w-full">
              Add item
            </Button>
          </div>
        </div>
      </DrawerModal>
    </div>
  );
};

export default ViewProduct;
