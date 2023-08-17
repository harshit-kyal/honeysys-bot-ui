import { Divider, ProductCard } from "@polynomialai/alpha-react";
import React from "react";
import PlusButton from "../Button/PlusButton";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

interface cardProps {
  id: string;
  imageSrc: string;
  title: string;
  price: number;
}

const CatalogProductCard = ({ id, imageSrc, price, title }: cardProps) => {
  const navigate = useNavigate();
  const priceCopy: string = `₹ ${price.toLocaleString("en-IN")}`;
  const likeSectionTemplate = useAppSelector(
    (state) => state.root.Catalog.likeSectionTemplate
  );

  return (
    <div
      onClick={() => {
        navigate(`/viewProduct/${id}`);
      }}
    >
      <ProductCard
        image={
          <img src={imageSrc} className={likeSectionTemplate.image} alt="" />
        }
        addBtn={
          <PlusButton
            onClick={() => {
              alert("Hello");
            }}
          />
        }
        price={priceCopy}
        title={title}
        priceCn={likeSectionTemplate.price}
        titleCn={likeSectionTemplate.title}
      />
      <Divider />
    </div>
  );
};

export default CatalogProductCard;
