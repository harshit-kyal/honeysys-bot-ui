import { Divider, ProductCard } from "@polynomialai/alpha-react";
import PlusButton from "../Button/PlusButton";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

interface cardProps {
  id: string;
  imageSrc: string;
  title: string;
  price: number;
  titleCn: string | null;
  priceCn: string | null;
}

const CatalogProductCard = ({
  id,
  imageSrc,
  price,
  title,
  titleCn,
  priceCn,
}: cardProps) => {
  const navigate = useNavigate();
  const priceCopy: string = `₹ ${price.toLocaleString("en-IN")}`;
  const likeSectionTemplate = useAppSelector(
    (state) => state.root.Catalog.likeSectionTemplate
  );
  console.log("sec", priceCn);
  return (
    <div
      onClick={() => {
        navigate(`/pdp/${id}`);
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
        priceCn={
          priceCn
            ? `${likeSectionTemplate.price} ${priceCn}`
            : likeSectionTemplate.price
        }
        titleCn={
          titleCn
            ? `${likeSectionTemplate.title} ${titleCn}`
            : likeSectionTemplate.title
        }
      />
      <Divider />
    </div>
  );
};

export default CatalogProductCard;
