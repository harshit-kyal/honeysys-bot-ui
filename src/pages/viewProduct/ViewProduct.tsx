import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { Button, DrawerModal, ProductCard } from "@polynomialai/alpha-react";
import { LeafyVegetables } from "../../constants/HomeConst";
import BadgeCard from "../../components/Resuable/BadgeCard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getChatData } from "../../slices/homeSlice";
import { useNavigate } from "react-router-dom";

const ViewProduct = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.home.loading);
  const error = useAppSelector((state) => state.home.error);
  const [Modal, setModal] = useState<boolean>(false);
  const convId = useAppSelector((state) => state.bot.convId);
  const botType = useAppSelector((state) => state.bot.botType);
  const [productData, setProductData] = useState<any>([]);
  const [productDetail, setProductDetail] = useState<any>({});
  const navigate = useNavigate();
  const category = () => {
    let newData = {
      conversationId: convId,
      text: "viewProduct",
      voiceFlag: false,
    };
    if (convId && botType && convId !== "" && botType !== "") {
      dispatch(getChatData({ newData, botType }))
        .then((data) => {
          if (data?.payload?.data?.activities[0]?.type === "viewProduct") {
            console.log(
              "raju",
              data?.payload?.data?.activities[0]?.value?.data[0]
            );
            setProductData(data?.payload?.data?.activities[0]?.value?.data[0]);
          }
        })
        .catch(() => {});
    }

    newData = {
      conversationId: convId,
      text: "productPrice",
      voiceFlag: false,
    };

    if (convId && botType && convId !== "" && botType !== "") {
      dispatch(getChatData({ newData, botType }))
        .then((data) => {
          console.log(
            "ramji",
            data?.payload?.data?.activities[0]?.value?.data[0]
          );
          if (data?.payload?.data?.activities[0]?.type === "productPrice") {
            setProductDetail(
              data?.payload?.data?.activities[0]?.value?.data[0]
            );
          }
        })
        .catch(() => {});
    }
  };
  useEffect(() => {
    category();
  }, []);
  const ProductData1: { imageSrc: string; title: string; pricing: any[] } = {
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
      <PageHeader title={productData?.title ? productData?.title : "..."} />
      {!loading && !error ? (
        <>
          <div className="pb-12">
            {productData?.products?.map((data: any, index: number) => (
              <ProductCard
                key={index}
                addBtn={<AddBtn />}
                className="w-full my-[6px] mb-3 px-5"
                image={
                  <img
                    src={data?.imageSrc}
                    className="object-cover rounded-lg w-[60px] h-[60px]"
                    alt=""
                  />
                }
                onClick={() => {}}
                title={data?.title}
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
              {productDetail?.pricing?.map((item: any, index: number) => (
                <ProductCard
                  key={index}
                  image={
                    <img
                      src={productDetail?.imageSrc}
                      alt="Product_Image"
                      className="h-[60px] w-[60px] !rounded-md mb-1"
                      onClick={() => navigate("/PDP/1")}
                    />
                  }
                  title={`${productDetail?.title} - ${item?.option}`}
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
        </>
      ) : loading && !error ? (
        <div className="px-2 pt-2">Loading...</div>
      ) : (
        <div className="px-2 pt-2">something went wrong</div>
      )}
    </div>
  );
};

export default ViewProduct;
