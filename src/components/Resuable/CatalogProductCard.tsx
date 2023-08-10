import { Divider, ProductCard } from "@polynomialai/alpha-react";
import React from "react";
import PlusButton from "../Button/PlusButton";
import { useNavigate } from "react-router-dom";

interface cardProps {
  id: string;
  imageSrc: string;
  title: string;
  price: number;
}

const CatalogProductCard = ({ id, imageSrc, price, title }: cardProps) => {
  const navigate = useNavigate();
  const priceCopy: string = `₹ ${price.toLocaleString("en-IN")}`;

  return (
    <div
      onClick={() => {
        navigate(`/viewProduct/${id}`);
      }}
    >
      <ProductCard
        imageSrc={imageSrc}
        addBtn={
          <PlusButton
            onClick={() => {
              alert("Hello");
            }}
          />
        }
        price={priceCopy}
        title={title}
      />
      <Divider />
    </div>
  );
};

export default CatalogProductCard;
