import PageHeader from "../../components/PageHeader";
import { Text } from "@polynomialai/alpha-react";
import OverlayWrapperCard from "../../components/Resuable/OverlayWrapperCard";
import CatalogProductCard from "../../components/Resuable/CatalogProductCard";
import { useNavigate } from "react-router-dom";
import { CategorieData } from "../../constants/HomeConst";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCatalogUI } from "../../slices/rootSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getChatData } from "../../slices/homeSlice";

const Catalog = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const convId = useAppSelector((state) => state.bot.convId);
  const botType = useAppSelector((state) => state.bot.botType);
  const pincode = useAppSelector((state) => state.home.userPincode);
  const [categoriesCatalog, setCategoriesCatalog] = useState<any>([]);
  const [productCatalog, setProductCatalog] = useState<any>([]);
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
  const catalogData = () => {
    let newData = {
      conversationId: convId,
      text: "viewCategoryCatalog",
      voiceFlag: false,
    };
    if (convId && botType && convId !== "" && botType !== "") {
      dispatch(getChatData({ newData, botType })).then((data) => {
        if (
          data?.payload?.data?.activities[0]?.type === "viewCategoryCatalog"
        ) {
          setCategoriesCatalog(data?.payload?.data?.activities[0]?.value?.data);
        }
      });
    }
    newData = {
      conversationId: convId,
      text: "viewProductCatalog",
      voiceFlag: false,
    };
    if (convId && botType && convId !== "" && botType !== "") {
      dispatch(getChatData({ newData, botType })).then((data) => {
        if (data?.payload?.data?.activities[0]?.type === "viewProductCatalog") {
          setProductCatalog(data?.payload?.data?.activities[0]?.value?.data);
        }
      });
    }
  };
  useEffect(() => {
    catalogData();
  }, []);
  const loading = useAppSelector((state) => state.home.loading);
  const error = useAppSelector((state) => state.home.error);
  console.log("pincode", pincode);
  return (
    <div className="h-screen max-[350px]:pt-[57px] min-[350px]:pt-[60px]">
      <PageHeader title="Catalog" />
      {!loading && !error ? (
        <>
          <OverlayWrapperCard
            className="w-full h-[50%] md:h-[60%] rounded-none"
            imageSrc="/images/store.jpg"
            contentTitle="Welcome!!"
            content="Our intuitive platform ensures that you find exactly what you're looking for, making your shopping experience delightful and efficient."
          />
          <div className="p-3 min-[350px]:!p-5 flex gap-3 border">
            <img src="/images/location.svg" alt="location" height={24} />
            <div
              className="flex flex-col"
              onClick={() => navigate("/addressDetails")}
            >
              <Text type="body" size="md" className="font-medium">
                {`Deliver to ${pincode ? pincode : "...."}`}
              </Text>
              <Text
                type="label"
                size="lg"
                className="font-normal text-[#505050]"
              >
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
              {categoriesCatalog.map((item: any, index: number) => (
                <div
                  onClick={() => {
                    navigate(`/categories/${item.id}`);
                  }}
                  key={"categories" + index}
                >
                  <OverlayWrapperCard
                    key={index}
                    className=" w-[90px] h-[92px] min-[350px]:!w-[100px] flex-shrink-0"
                    imageSrc={item?.imageSrc ? item?.imageSrc : ""}
                    title={item?.title ? item?.title : ""}
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
              {productCatalog.map((data: any, index: number) => (
                <div className="w-full sm:w-[50%] flex-shrink-0 basis-full sm:basis-[49%]">
                  <CatalogProductCard
                    id={data?.id ? data?.id : ""}
                    imageSrc={data?.imageSrc ? data?.imageSrc : ""}
                    price={data?.price ? data?.price : ""}
                    title={data?.title ? data?.title : ""}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : loading && !error ? (
        <div className="px-2 pt-2">Loading...</div>
      ) : (
        <div className="px-2 pt-2">something went wrong</div>
      )}
    </div>
  );
};

export default Catalog;
