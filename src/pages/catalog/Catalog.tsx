import PageHeader from "../../components/PageHeader";
import { Text } from "@polynomialai/alpha-react";
import OverlayWrapperCard from "../../components/Resuable/OverlayWrapperCard";
import CatalogProductCard from "../../components/Resuable/CatalogProductCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setCatalogUI } from "../../slices/rootSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToCartArray, getChatData } from "../../slices/homeSlice";
import toast, { Toaster } from "react-hot-toast";

const Catalog = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const convId = useAppSelector((state) => state.bot.convId);
  const storeId = useAppSelector((state) => state.home.storeId);
  const botType = useAppSelector((state) => state.bot.botType);
  const pincode = useAppSelector((state) => state.home.userPincode);
  const cartId = useAppSelector((state) => state.home.cartId);
  const [categoriesCatalog, setCategoriesCatalog] = useState<any>([]);
  const [productCatalog, setProductCatalog] = useState<any>([]);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
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
  const categoryCatalogData = async () => {
    let newData = {
      conversationId: convId,
      text: "viewCategoryCatalog",
      isChatVisible: false,
      voiceFlag: false,
      data: {
        storeId: storeId,
      },
    };

    if (convId && botType && convId !== "" && botType !== "") {
      await dispatch(getChatData({ newData, botType }))
        .then((data) => {
          if (
            data?.payload?.data?.activities[0][0]?.type ===
            "viewCategoryCatalog"
          ) {
            setCategoriesCatalog(
              data?.payload?.data?.activities[0][0]?.value?.data
            );
          }
        })
        .catch(() => setError(true));
    }
  };
  const productCatalogData = async () => {
    const newData = {
      conversationId: convId,
      text: "viewProductCatalog",
      voiceFlag: false,
      isChatVisible: false,
      data: {
        storeId: storeId,
      },
    };
    if (convId && botType && convId !== "") {
      await dispatch(getChatData({ newData, botType }))
        .then((data) => {
          if (
            data?.payload?.data?.activities[0][0]?.type === "viewProductCatalog"
          ) {
            setProductCatalog(
              data?.payload?.data?.activities[0][0]?.value?.data
            );
          }
        })
        .catch(() => setError(true));
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        Promise.all([categoryCatalogData(), productCatalogData()]).then(
          (res) => {
            setLoading(false);
          }
        );
      } catch (error) {
        setLoading(false);
        setError(true);
        console.error("Error in fetchData:", error);
      }
    };
    fetchData();
  }, []);

  const error = useAppSelector((state) => state.home.error);
  useEffect(() => {
    if (error) {
      setError(true);
    } else {
      setError(false);
    }
  }, [error]);
  const catalogToastModal = ({ text = "" }: { text: string }) => {
    toast(text, {
      style: {
        padding: " 16px 10px",
        borderRadius: "8px",
        background: "#0a4310",
        color: "#FFF",
      },
    });
  };
  const handleAddApi = (data: any) => {
    setAddLoading(true);
    const newData = {
      conversationId: convId,
      text: "addtocart",
      isChatVisible: false,
      voiceFlag: false,
      data: data,
    };
    if (convId && botType && convId !== "" && botType !== "") {
      dispatch(getChatData({ newData, botType }))
        .then((data) => {
          setAddLoading(false);
        })
        .catch(() => {
          setAddLoading(false);
        });
    }
  };
  return (
    <div className="h-screen max-[350px]:pt-[57px] min-[350px]:pt-[60px]">
      <PageHeader title="Catalog" />
      {!Loading && !Error ? (
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
                    navigate(`/categories/home`);
                  }}
                >
                  View all
                </span>
              </Text>
            </div>

            <div className="flex overflow-x-auto gap-4">
              {categoriesCatalog?.map((item: any, index: number) => (
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
              {productCatalog?.map((data: any, index: number) => (
                <div className="w-full sm:w-[50%] flex-shrink-0 basis-full sm:basis-[49%]">
                  <CatalogProductCard
                    key={index}
                    id={data?.variants[0]?.id ? data?.variants[0]?.id : ""}
                    imageSrc={data?.imageSrc ? data?.imageSrc : ""}
                    price={
                      data?.variants[0]?.price ? data?.variants[0]?.price : ""
                    }
                    onClick={() => {
                      let varientData = data.variants[0];
                      let qua = 1;
                      if (varientData?.minPurchaseLimit > qua) {
                        qua = varientData?.minPurchaseLimit;
                      }
                      if (
                        varientData?.stockBalance < qua ||
                        (varientData?.purchaseLimit != 0 &&
                          qua > varientData?.purchaseLimit)
                      ) {
                        catalogToastModal({ text: "This product stock is limited" });
                        return;
                      } else {
                        let cartItem = {
                          productId: data?.id,
                          varientId: varientData?.id,
                          storeId: storeId,
                          productVariantIndex: varientData?.productVariantIndex,
                          quantity: qua,
                          cartId: cartId,
                        };
                        dispatch(addToCartArray(cartItem));
                        handleAddApi(cartItem);
                      }
                    }}
                    title={
                      data?.variants[0]?.productName
                        ? data?.variants[0]?.productName
                        : ""
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          {addLoading && (
            <div className="cartLoader">
              <div className="cartLoader-text">Loading...</div>
            </div>
          )}
          {/* <Toaster /> */}
        </>
      ) : Loading && !Error ? (
        <div className="px-2 pt-2">Loading...</div>
      ) : (
        <div className="px-2 pt-2">something went wrong</div>
      )}
    </div>
  );
};

export default Catalog;
