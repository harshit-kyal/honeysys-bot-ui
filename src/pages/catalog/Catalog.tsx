import PageHeader from "../../components/PageHeader";
import { Text } from "@polynomialai/alpha-react";
import OverlayWrapperCard from "../../components/Resuable/OverlayWrapperCard";
import CatalogProductCard from "../../components/Resuable/CatalogProductCard";
import { useNavigate } from "react-router-dom";
import { CategorieData } from "../../constants/HomeConst";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCatalogUI } from "../../slices/rootSlice";

const Catalog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productTemplate, setProductTemplate] = useState<any>("");
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const params: any = searchParams.get("catalogData");
    const Data = JSON.parse(decodeURIComponent(params));
    const backDrop: any = searchParams.get("categoryBackDrop");
    if (backDrop && params) {
      dispatch(
        setCatalogUI({
          categoryBackDrop: backDrop,
          youMayLike: {
            imageBorderColor: Data?.imageBorderColor,
            titleWeight: Data?.titleWeight,
            titleColor: Data?.titleColor,
            priceWeight: Data?.priceWeight,
            priceColor: Data?.priceColor,
          },
        })
      );
    }
  }, [window.location.search]);

  return (
    <div className="h-screen pt-[60px]">
      <PageHeader title="Catalog" />
      <OverlayWrapperCard
        className="w-full h-auto rounded-none"
        imageSrc="/images/Welcome.svg"
        contentTitle="Welcome!!"
        content="Our intuitive platform ensures that you find exactly what you're looking for, making your shopping experience delightful and efficient."
      />
      <div className="p-3 min-[350px]:!p-5 flex gap-3 border">
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
      <div className="p-3 min-[350px]:!p-5">
        <div className="flex pb-1 min-[350px]:!pb-3  justify-between">
          <Text type="body" size="lg" className="font-medium">
            Categories
          </Text>
          <Text
            type="body"
            size="md"
            className="font-normal text-primary underline"
          >
            <span
              onClick={() => {
                navigate(`/categories/1`);
              }}
            >
              View all
            </span>
          </Text>
        </div>

        <div className="flex overflow-x-auto gap-4">
          {CategorieData.map((item: any, index: number) => (
            <div
              onClick={() => {
                navigate(`/categories/${item.id}`);
              }}
              key={"categories" + index}
            >
              <OverlayWrapperCard
                key={index}
                className=" w-[90px] h-[92px] min-[350px]:!w-[100px] flex-shrink-0"
                imageSrc="/images/vegetables.svg"
                title="Fruits & Vegetables"
              />
            </div>
          ))}
        </div>

        <div className="flex py-3 min-[350px]:!py-5 justify-between">
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

        <div className="flex w-full flex-wrap overflow-y-auto gap-3">
          {Array.from({ length: 10 }, (_, index) => (
            <div className="w-full sm:w-[50%] flex-shrink-0 basis-full sm:basis-[49%]">
              <CatalogProductCard
                id="1"
                imageSrc="/images/shirt.svg"
                price={3500}
                title="Denim T-shirt Sandstorm Color (XL)"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
