import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Text } from "@polynomialai/alpha-react";
import Dropdown from "../../components/Resuable/Dropdown";
import ActionButton from "../../components/Resuable/ActionButton";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addToCartArray,
  getChatData,
  minusToCartArray,
} from "../../slices/homeSlice";

const PDP = () => {
  const { id } = useParams();
  const storeId = useAppSelector((state) => state.home.storeId);
  const error = useAppSelector((state) => state.home.error);
  const convId = useAppSelector((state) => state.bot.convId);
  const botType = useAppSelector((state) => state.bot.botType);
  const cartId = useAppSelector((state) => state.home.cartId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>({});
  const [activePrice, setActivePrice] = useState<any>();
  const [DropdownOption, setDropdownOption] = useState<any>([]);
  const [quantity, setQuantity] = useState(0);
  const cart = useAppSelector((state) => state.home.cart);
  const [Error, setError] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [qtyLoading, setQtyLoading] = useState(false);

  const categoryCatalog = async () => {
    let newData = {
      conversationId: convId,
      text: "productdetails",
      isChatVisible: false,
      voiceFlag: false,
      data: {
        storeId: storeId,
        productId: id,
      },
    };
    if (convId && botType && convId !== "" && botType !== "") {
      await dispatch(getChatData({ newData, botType }))
        .then((data) => {
          if (
            data &&
            data?.payload?.data?.activities[0][0]?.type === "productdetails"
          ) {
            setProduct(data?.payload?.data?.activities[0][0]?.value?.data);
          }
        })
        .catch((error) => setError(true));
    }
  };
  useEffect(() => {
    if (error) {
      setError(true);
    }
  }, [error]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        Promise.all([categoryCatalog()]).then((res) => {
          setLoading(false);
        });
      } catch (error) {
        setLoading(false);
        console.error("Error in fetchData:", error);
      }
    };
    fetchData();
  }, []);
  const [debounceTimeout, setDebounceTimeout] = useState<any>(null);
  const handleAddApi = (data: any) => {
    setQtyLoading(true);
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
          setQtyLoading(false);
        })
        .catch(() => {
          setQtyLoading(false);
        });
    }
  };
  const debounceAddApi = (data: any) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeoutId = setTimeout(() => {
      handleAddApi(data);
    }, 800);
    setDebounceTimeout(timeoutId);
  };
  useEffect(() => {
    if (quantity !== 0) {
      let changedData = {
        productId: product?.productId,
        varientId: product?.variants[0]._id,
        storeId: storeId,
        productVariantIndex: product?.variants[0].productVariantIndex,
        quantity: quantity,
        cartId: cartId,
      };
      debounceAddApi(changedData);
    } else {
      clearTimeout(debounceTimeout);
    }
  }, [quantity]);
  // const ProductData1: { imageSrc: string; title: string; pricing: any[] } = {
  //   imageSrc: "/images/onion.svg",
  //   title: "Fresh Cauliflower",
  //   pricing: [
  //     { id: "1", option: "500 g", price: 60 },
  //     { id: "2", option: "1 kg", price: 120 },
  //     { id: "3", option: "2 kg", price: 240 },
  //     { id: "4", option: "5 kg", price: 600 },
  //   ],
  // };
  useEffect(() => {
    if (id && product && product?.variants?.length > 0) {
      !activePrice && setActivePrice(product?.variants[0]);
      setDropdownOption([
        ...product?.variants?.map((item: any) => item.option),
      ]);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      let find = cart.find(
        (item: any) =>
          item?.productId === product?.productId &&
          item?.varientId === activePrice?.id
      );
      if (find) {
        setQuantity(find.quantity);
      }
    }
  }, [activePrice]);

  const onChange = (value: string) => {
    const pricing = product?.variants.find(
      (item: any) => item.option === value
    );
    setActivePrice(pricing);
  };
  // const addApi = (data: any) => {
  //   setQtyLoading(true);
  //   let newData = {
  //     conversationId: convId,
  //     text: "addtocart",
  //     voiceFlag: false,
  //     isChatVisible: false,
  //     data: data,
  //   };
  //   if (convId && botType && convId !== "" && botType !== "") {
  //     dispatch(getChatData({ newData, botType }))
  //       .then((data) => {
  //         setQtyLoading(false);
  //       })
  //       .catch((error) => {
  //         setError(true);
  //         setQtyLoading(false);
  //       });
  //   }
  // };
  const removeApi = (data: any) => {
    clearTimeout(debounceTimeout);
    setQtyLoading(true);
    let newData = {
      conversationId: convId,
      isChatVisible: false,
      text: "removefromcart",
      voiceFlag: false,
      data: data,
    };
    if (convId && botType && convId !== "" && botType !== "") {
      dispatch(getChatData({ newData, botType }))
        .then((data) => {
          setQtyLoading(false);
        })
        .catch(() => {
          setQtyLoading(false);
          setError(true);
        });
    }
  };
  const addItem = () => {
    // let DataCopy: any = JSON.parse(JSON.stringify(product));
    // let pricingCopy: any[] = [...DataCopy.variants];

    // pricingCopy = pricingCopy?.map((item: any) => {
    product?.variants?.map((item: any) => {
      if (item.id === activePrice?.id) {
        let qua = quantity + 1;
        if (item?.minPurchaseLimit > qua) {
          qua = item?.minPurchaseLimit;
        }
        if (
          item?.stockBalance < qua ||
          (item?.purchaseLimit != 0 && qua > item?.purchaseLimit)
        ) {
          alert("This product stock is limited");
          return;
        } else {
          let cartItem = {
            productId: product?.productId,
            varientId: item?.id,
            storeId: storeId,
            productVariantIndex: item?.productVariantIndex,
            quantity: qua,
            cartId: cartId,
          };
          dispatch(addToCartArray(cartItem));
          // addApi(cartItem);
          setQuantity(qua);
        }
      }
      return item;
    });
    // DataCopy.variants = pricingCopy;
    // setProduct({ ...DataCopy });
  };
  const removeItem = () => {
    // let DataCopy: any = JSON.parse(JSON.stringify(product));
    // let pricingCopy: any[] = [...DataCopy.variants];

    product?.variants?.map((item: any) => {
      if (item.id === activePrice?.id) {
        // setActivePrice(item);
        let qua = quantity - 1;
        if (item?.minPurchaseLimit > qua) {
          qua = 0;
        }
        let cartItem = {
          productId: product?.productId,
          varientId: item?.id,
          storeId: storeId,
          productVariantIndex: item?.productVariantIndex,
          quantity: qua,
          cartId: cartId,
        };
        dispatch(minusToCartArray(cartItem));
        setQuantity(qua);
        if (qua >= 1) {
          // addApi(cartItem);
        } else {
          let cartItem = {
            productId: product?.productId,
            storeId: storeId,
            productVariantIndex: item?.productVariantIndex,
            cartId: cartId,
          };
          removeApi(cartItem);
        }
      }
      return item;
    });
    // DataCopy.variants = pricingCopy;
    // setProduct(DataCopy);
  };
  return (
    <div className="h-screen pt-[60px]">
      {/* header */}
      <PageHeader
        title={`${product?.productName ? product?.productName : "..."} `}
      />
      {/* Product Image */}
      {!Loading && !Error ? (
        <>
          <div className="flex justify-center mt-3">
            <img
              src={product?.imageSrc ? product?.imageSrc : ""}
              alt="Product_Image"
              className="h-[32vh] w-[32vh]"
            />
          </div>
          {/* Detail Section */}
          <div
            className="px-5 pb-5 mt-4 flex flex-col justify-between relative"
            style={{ height: "calc(55vh - 23px)" }}
          >
            {/* Title, Dropdown, Description  */}
            <div>
              <div className="flex gap-5">
                <div className="font-semibold w-[59%] text-xl">
                  {product?.productName ? product?.productName : ""}
                </div>

                <Dropdown
                  option={DropdownOption}
                  onChange={onChange}
                  selected={activePrice?.option}
                  optionWidth="70px"
                />
              </div>
              <div className="mt-4 text-base text-[#505050]">
                {product?.shortDescription
                  ? product?.shortDescription.slice(0, 300)
                  : ""}
              </div>
            </div>
            {/* Add Buttons */}
            {/* <div className=" absolute bottom-0"> */}
            <div className="flex absolute bottom-0 left-0 px-4 w-full ">
              {/* + or -  */}
              {quantity > 0 && (
                <div className="flex w-[45%] gap-1 justify-evenly">
                  <img
                    src="/images/minus.svg"
                    alt="minus"
                    height={41}
                    className="flex-shrink-0 h-[41px] w-[41px] "
                    onClick={removeItem}
                  />
                  <div className="h-[41px] w-[41px] flex-shrink-0 rounded border border-[#E6E6E6] flex justify-center items-center">
                    <Text type="body" size="md" className="font-medium">
                      {quantity}
                    </Text>
                  </div>
                  <img
                    src="/images/plus.svg"
                    alt="minus"
                    height={41}
                    className="flex-shrink-0 h-[41px] w-[41px]"
                    onClick={addItem}
                  />
                </div>
              )}
              {/* main button */}
              <div
                style={{
                  width: quantity > 0 ? "55%" : "100%",
                }}
              >
                <ActionButton
                  className="bg-primary text-white rounded-md gap-3 h-[41px]"
                  src="/images/shopping.svg"
                  text={`₹ ${(quantity === 0
                    ? activePrice?.price
                    : activePrice?.price * quantity
                  )?.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                  onClick={() => {
                    console.log("quaaaa")
                    if (quantity === 0) {
                      addItem();
                    } else {
                      navigate("/cart");
                    }
                    // let p = {
                    //   productId: product?.productId,
                    //   varientId: product?.id,
                    //   storeId: storeId,
                    //   productVariantIndex: product?.productVariantIndex,
                    //   quantity: quantity,
                    // };
                    // dispatch(addToCartArray(p));
                  }}
                />
              </div>
            </div>
            {/* </div> */}
          </div>
          {qtyLoading && (
            <div className="cartLoader">
              <div className="cartLoader-text">Loading...</div>
            </div>
          )}
        </>
      ) : Loading && !Error ? (
        <div className="px-2 pt-2">Loading...</div>
      ) : (
        <div className="px-2 pt-2">something went wrong</div>
      )}
    </div>
  );
};

export default PDP;
