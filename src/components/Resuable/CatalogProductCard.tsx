import { Divider, ProductCard } from "@polynomialai/alpha-react";
import PlusButton from "../Button/PlusButton";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

interface cardProps {
  id: string;
  imageSrc: string;
  title: string;
  price: number;
  // titleCn: string | null;
  // priceCn: string | null;
}

const CatalogProductCard = ({
  id,
  imageSrc,
  price,
  title,
  // titleCn,
  // priceCn,
}: cardProps) => {
  const navigate = useNavigate();
  const priceCopy: string = `₹ ${price.toLocaleString("en-IN")}`;
  // const likeSectionTemplate = useAppSelector(
  //   (state) => state.root.CatalogUI.youmayLike
  // );
  return (
    <div
      onClick={() => {
        navigate(`/pdp/${id}`);
      }}
    >
      <ProductCard
      className="mb-2"
        image={
          <img
            src={imageSrc}
            // className="border border-catalogImageBorderColor"
            alt=""
          />
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
        priceCn={ `!font-catalogPriceWeight !text-catalogPriceColor`
        }
        titleCn={ `!font-catalogTitleWeight !text-catalogTitleColor`
        }
      />
      <Divider />
    </div>
  );
};

export default CatalogProductCard;
