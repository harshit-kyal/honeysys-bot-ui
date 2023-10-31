import { Divider, ProductCard } from "@polynomialai/alpha-react";
import PlusButton from "../Button/PlusButton";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useDispatch } from "react-redux";
import { addToCartArray } from "../../slices/homeSlice";

interface cardProps {
  id: string;
  imageSrc: string;
  title: string;
  price: number;
  onClick: any;
  // titleCn: string | null;
  // priceCn: string | null;
}

const CatalogProductCard = ({
  id,
  imageSrc,
  price,
  title,
  onClick,
}: // titleCn,
// priceCn,
cardProps) => {
  const navigate = useNavigate();
  const priceCopy: string = `₹ ${price.toLocaleString("en-IN")}`;
  // const likeSectionTemplate = useAppSelector(
  //   (state) => state.root.CatalogUI.youmayLike
  // );
  const dispatch = useAppDispatch();
  return (
    <div onClick={onClick}>
      <ProductCard
        className="mb-2"
        image={
          <img
            src={imageSrc}
            className="h-[60px] w-[60px]"
            // className="border border-catalogImageBorderColor"
            alt=""
          />
        }
        addBtn={
          <PlusButton
            onClick={() => {
              // let data = {
              //   id: id,
              //   quantity: 1,
              // };
              // dispatch(addToCartArray(data));
            }}
          />
        }
        price={priceCopy}
        title={title}
        priceCn={`!font-catalogPriceWeight !text-catalogPriceColor`}
        titleCn={`!font-catalogTitleWeight !text-catalogTitleColor`}
      />
      <Divider />
    </div>
  );
};

export default CatalogProductCard;
