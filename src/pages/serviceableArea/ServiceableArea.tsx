import { Button } from "@polynomialai/alpha-react";
import { useNavigate } from "react-router-dom";
import {
  addToCartArray,
  getChatData,
  setCartId,
  setGetStartDisplay,
  setStoreData,
  setStoreId,
} from "../../slices/homeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useState } from "react";
import { ToastPopup } from "../../utils/TosterPopup";

const ServiceableArea = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const convId = useAppSelector((state) => state.bot.convId);
  const botType = useAppSelector((state) => state.bot.botType);
  const [Loading, setLoading] = useState(false);
  let storeData = [
    {
      id: "648beef8f65367341ca5f066",
      locationName: "Kondapur ",
      orderValue: 1,
      activeFlag: true,
      deleteFlag: false,
      createdBy: "admin",
      creationDate: "2023-06-16T05:11:20.809Z",
    },
    {
      id: "648bef05f65367341ca5f067",
      locationName: "Gachibowli",
      orderValue: 2,
      activeFlag: true,
      deleteFlag: false,
      createdBy: "admin",
      creationDate: "2023-06-16T05:11:33.330Z",
    },
    {
      id: "648beef8f65367341ca5f066",
      locationName: "Kondapur ",
      orderValue: 1,
      activeFlag: true,
      deleteFlag: false,
      createdBy: "admin",
      creationDate: "2023-06-16T05:11:20.809Z",
    },
    {
      id: "648bef05f65367341ca5f067",
      locationName: "Gachibowli",
      orderValue: 2,
      activeFlag: true,
      deleteFlag: false,
      createdBy: "admin",
      creationDate: "2023-06-16T05:11:33.330Z",
    },
    {
      id: "648beef8f65367341ca5f066",
      locationName: "Kondapur ",
      orderValue: 1,
      activeFlag: true,
      deleteFlag: false,
      createdBy: "admin",
      creationDate: "2023-06-16T05:11:20.809Z",
    },
    {
      id: "648bef05f65367341ca5f067",
      locationName: "Gachibowli",
      orderValue: 2,
      activeFlag: true,
      deleteFlag: false,
      createdBy: "admin",
      creationDate: "2023-06-16T05:11:33.330Z",
    },
    {
      id: "648beef8f65367341ca5f066",
      locationName: "Kondapur ",
      orderValue: 1,
      activeFlag: true,
      deleteFlag: false,
      createdBy: "admin",
      creationDate: "2023-06-16T05:11:20.809Z",
    },
    {
      id: "648bef05f65367341ca5f067",
      locationName: "Gachibowli",
      orderValue: 2,
      activeFlag: true,
      deleteFlag: false,
      createdBy: "admin",
      creationDate: "2023-06-16T05:11:33.330Z",
    },
    {
      id: "648beef8f65367341ca5f066",
      locationName: "Kondapur ",
      orderValue: 1,
      activeFlag: true,
      deleteFlag: false,
      createdBy: "admin",
      creationDate: "2023-06-16T05:11:20.809Z",
    },
    {
      id: "648bef05f65367341ca5f067",
      locationName: "Gachibowli",
      orderValue: 2,
      activeFlag: true,
      deleteFlag: false,
      createdBy: "admin",
      creationDate: "2023-06-16T05:11:33.330Z",
    },
  ];
  const skipHandler = () => {
    setLoading(true);
    const newData = {
      conversationId: convId,
      text: "experienceStore",
      isChatVisible: false,
      voiceFlag: false,
    };

    if (convId && botType) {
      dispatch(getChatData({ newData, botType }))
        .then((data: any) => {
          let storeData = data?.payload?.data?.activities[0][0];
          if (data && storeData?.type === "experienceStore" && storeData) {
            dispatch(setStoreData(storeData?.value?.data[0]));
            let cartIds = storeData?.value?.data[0]?.cartId;
            dispatch(setCartId(cartIds));
            let storeIds = storeData?.value?.data[0]?.id;
            dispatch(setStoreId(storeIds));
            if (storeIds && cartIds) {
              cartItems(storeIds, cartIds);
              // cartIdData(storeIds);
              navigate("/");
              dispatch(setGetStartDisplay(true));
            }
          } else {
            ToastPopup({ text: "store not found something went wrong" });
          }
        })
        .catch((error) => {
          ToastPopup({ text: "store not found something went wrong" });
          console.log("err", error);
        });
    }
  };
  const cartItems = async (storeIds: any, cartId: any) => {
    if (storeIds && cartId) {
      const newData = {
        conversationId: convId,
        text: "viewCart",
        voiceFlag: false,
        isChatVisible: false,
        data: {
          storeId: storeIds,
          cartId: cartId,
        },
      };
      if (convId && botType && convId !== "" && botType !== "") {
        await dispatch(getChatData({ newData, botType }))
          .then((data) => {
            if (
              data &&
              data?.payload?.data?.activities[0][0]?.type === "viewCart"
            ) {
              let cartData =
                data?.payload?.data?.activities[0][0]?.value?.data?.cartProduct;
              if (cartData && Array.isArray(cartData)) {
                cartData?.map((item: any, index: number) => {
                  let cartItem = {
                    productId: item.variants[0]?.productId,
                    varientId: item.variants[0]?._id,
                    storeId: storeIds,
                    productVariantIndex: item.variants[0]?.productVariantIndex,
                    quantity: item?.quantity,
                    cartId: cartId,
                  };
                  dispatch(addToCartArray(cartItem));
                });
              }
              // setCartList(data?.payload?.data?.activities[0]?.value.data);
              // setLoading(false);
              // setAmountLoader(false);
            }
          })
          .catch((error) => {
            ToastPopup({ text: "something went wrong" });
            console.log("err", error);
          });
      }
    }
  };
  // const cartIdData = (storeIds: any) => {
  //   if (storeIds) {
  //     const newData = {
  //       conversationId: convId,
  //       text: "getcartid",
  //       voiceFlag: false,
  //       isChatVisible: false,
  //       data: {
  //         storeId: storeIds,
  //       },
  //     };

  //     if (convId && botType && convId !== "" && botType !== "") {
  //       dispatch(getChatData({ newData, botType }))
  //         .then((data) => {
  //           setLoading(false);
  //           let cartData = data?.payload?.data?.activities[0][0];
  //           if (data && cartData?.type === "getCartId") {
  //             let cartId = cartData?.value?.data?.cartId;
  //             if (cartId) {
  //               cartItems(storeIds, cartId);
  //               dispatch(setCartId(cartId));
  //               navigate("/");
  //               dispatch(setGetStartDisplay(true));
  //             } else {
  //               ToastPopup({ text: "cartid not found something went wrong" });
  //             }
  //           }
  //         })
  //         .catch((error) => {
  //           setLoading(false);
  //           ToastPopup({ text: "something went wrong" });
  //           console.log("err", error);
  //         });
  //     }
  //   }
  // };
  return (
    <div>
      <div className="h-[32vh] bg-[#d3d3df] py-3">
        <img
          src="/images/black_back.svg"
          className="cursor-pointer ms-2"
          alt="back"
          height={24}
          width={24}
          onClick={() => navigate(-1)}
        />
        <div className="flex items-center justify-center flex-col">
          <img
            src="/images/not_serviceable.png"
            alt=""
            height={120}
            width={120}
          ></img>
          <div className="text-center">Sorry, This area is not serviceable</div>
          <div className="text-center text-xs mt-2 mx-5">
            We are working to bring the seemless online shooping experience to
            your location very soon. <u>GET NOTIFIED</u>
          </div>
        </div>
      </div>
      <div className="h-[68vh]">
        <div className="px-3 py-3">
          <div className="h-[52vh] relative ">
            <div className="text-primary  text-[11px]">
              FIND US BELOW SERVICEABLE AREA
            </div>
            <div
              className="mt-2 overflow-auto"
              style={{ height: "calc(52vh - 23px)" }}
            >
              {storeData.map((items: any, index: number) => (
                <div className="flex border-b-2 pb-2 mt-1" key={index}>
                  <img
                    src="/images/location1.svg"
                    alt=""
                    height={35}
                    width={27}
                  ></img>
                  <div className="ms-3">
                    <div className="text-base">{items?.locationName}</div>
                    <div className="text-xs text-[gray]">
                      {items?.locationName}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className=" w-full flex justify-end items-center flex-col mt-[12px]">
            <Button
              className="!bg-primary text-white text-xs mx-5 max-[500px]:w-[90%] min-[500px]:w-[40%] min-[1024px]:w-[20%] text-center py-[10px]"
              onClick={() => navigate("/address")}
            >
              Change Location
            </Button>
            <div
              className="text-primary mt-2 text-sm cursor-pointer"
              onClick={() => skipHandler()}
            >
              Skip & Browse
            </div>
          </div>
        </div>
      </div>
      {Loading && (
        <div className="cartLoader">
          <div className="cartLoader-text">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default ServiceableArea;
