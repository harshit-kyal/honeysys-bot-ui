import React from "react";
import PageHeader from "../../components/PageHeader";
import { OverlayCard, Text } from "@polynomialai/alpha-react";
import OverlayWrapperCard from "../../components/Resuable/OverlayWrapperCard";

const Catalog = () => {
  return (
    <div className="h-screen">
      <PageHeader title="Catalog" />
      <div style={{ height: "calc(100vh - 60px)" }}>
        <OverlayWrapperCard
          className="w-[100%] h-[250px] rounded-none"
          imageSrc="/images/Welcome.svg"
          overlay="rgba(0, 0, 0, 0.5)"
          contentTitle="Welcome!!"
          content="Our intuitive platform ensures that you find exactly what you're looking for, making your shopping experience delightful and efficient."
        />
        <div className="p-5 flex gap-3 border">
          <img src="/images/location.svg" alt="location" height={24} />
          <div className="flex flex-col">
            <Text type="body" size="md" className="font-medium">
              Deliver to 560103
            </Text>
            <Text type="label" size="lg" className="font-normal text-[#505050]">
              Tap to change pincode
            </Text>
          </div>
        </div>
        <div className="p-5">
          <div className="flex pb-3 justify-between">
            <Text type="body" size="lg" className="font-medium">
              Categories
            </Text>
            <Text
              type="body"
              size="md"
              className="font-normal text-primary underline"
            >
              View all
            </Text>
          </div>
          <div className="flex overflow-x-auto gap-4">
            <OverlayWrapperCard
              className="w-[100px] h-[92px] flex-shrink-0"
              imageSrc="/images/vegetables.svg"
              title="Fruits & Vegetables"
            />
            <OverlayWrapperCard
              className="w-[100px] h-[92px] flex-shrink-0"
              imageSrc="/images/vegetables.svg"
              title="Fruits & Vegetables"
            />
            <OverlayWrapperCard
              className="w-[100px] h-[92px] flex-shrink-0"
              imageSrc="/images/vegetables.svg"
              title="Fruits & Vegetables"
            />
            <OverlayWrapperCard
              className="w-[100px] h-[92px] flex-shrink-0"
              imageSrc="/images/vegetables.svg"
              title="Fruits & Vegetables"
            />
            <OverlayWrapperCard
              className="w-[100px] h-[92px] flex-shrink-0"
              imageSrc="/images/vegetables.svg"
              title="Fruits & Vegetables"
            />
            <OverlayWrapperCard
              className="w-[100px] h-[92px] flex-shrink-0"
              imageSrc="/images/vegetables.svg"
              title="Fruits & Vegetables"
            />
            <OverlayWrapperCard
              className="w-[100px] h-[92px] flex-shrink-0"
              imageSrc="/images/vegetables.svg"
              title="Fruits & Vegetables"
            />
          </div>
          <div className="flex py-3 justify-between">
            <Text type="body" size="lg" className="font-medium">
              You May Like
            </Text>
            <Text
              type="body"
              size="md"
              className="font-normal text-primary underline"
            >
              View all
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
