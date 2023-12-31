import { useEffect, useState } from "react";
import "./searchProduct.css";
import { Button, DrawerModal, ProductCard } from "@polynomialai/alpha-react";
import BackButton from "../../components/Button/BackButton";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { addToCartArray, getChatData } from "../../slices/homeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ToastPopup } from "../../utils/TosterPopup";
import { QuantityHandler } from "../../utils/QuantityHandler";

const SearchProduct = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const storeId = useAppSelector((state) => state.home.storeId);
  const convId = useAppSelector((state) => state.bot.convId);
  const cart = useAppSelector((state) => state.home.cart);
  const cartData = useAppSelector((state) => state.home.cart);
  const orderProduct = useAppSelector((state) => state.home.orderProduct);
  const cartId = useAppSelector((state) => state.home.cartId);
  const botType = useAppSelector((state) => state.bot.botType);
  const [searchStr, setSearchStr] = useState("");
  const [Modal, setModal] = useState<boolean>(false);
  const [cartItem, setCartItem] = useState<any>({});
  const [varient, setVarient] = useState<any>([]);
  const [searchList, setSearchList] = useState([]);
  const [qtyLoading, setQtyLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [Loading, setLoading] = useState(false);
  const error = useAppSelector((state) => state.home.error);
  const [trendingSearchOptions, setTrendingSearchOptions] = useState<any>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<any>(null);
  const location = useLocation();
  const searchData = location?.state?.searchData;
  useEffect(() => {
    if (searchData) {
      setSearchStr(searchData);
    }
  }, [searchData]);

  const handleSearchData = (data: any) => {
    const newData = {
      conversationId: convId,
      text: "searchProduct",
      voiceFlag: false,
      isChatVisible: false,
      data: {
        storeId: storeId,
        searchText: data,
        searchKey: data,
      },
    };

    if (convId && botType && convId !== "" && botType !== "") {
      setLoading(true);
      dispatch(getChatData({ newData, botType }))
        .then((data) => {
          let searchData = data?.payload?.data?.activities[0][0];

          if (
            data &&
            searchData?.type === "searchProduct" &&
            searchData?.value?.data &&
            Array.isArray(searchData?.value?.data)
          ) {
            let searchItems = searchData?.value?.data;
            setSearchList(searchItems);
            setLoading(false);
          } else {
            ToastPopup({ text: "something went wrong" });
          }
        })
        .catch((error) => {
          setLoading(false);
          ToastPopup({ text: "something went wrong" });
          setError(true);
          console.log("err", error);
        });
    }
  };
  const debounceSearchApi = (data: any) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeoutId = setTimeout(() => {
      handleSearchData(data);
    }, 800);
    setDebounceTimeout(timeoutId);
  };
  useEffect(() => {
    if (searchStr) {
      debounceSearchApi(searchStr);
    }
  }, [searchStr]);

  const AddBtn = (subCategory: any) => {
    return (
      <div
        className="flex flex-col items-center"
        onClick={() => {
          setVarient(subCategory?.subCategory);
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
  const searchToastModal = ({ text = "" }: { text: string }) => {
    toast(text, {
      style: {
        padding: " 16px 10px",
        borderRadius: "8px",
        background: "#0a4310",
        color: "#FFF",
      },
    });
  };
  const api = (data: any) => {
    setQtyLoading(true);
    let newData = {
      conversationId: convId,
      text: "addtocart",
      voiceFlag: false,
      isChatVisible: false,
      data: data,
    };
    if (convId && botType && convId !== "" && botType !== "") {
      dispatch(getChatData({ newData, botType }))
        .then((response) => {
          setQtyLoading(false);
          if (
            response?.payload?.data?.activities[0][0]?.value?.data?.message ===
            "Product Update Successfully"
          ) {
            ToastPopup({ text: "Product added" });
            dispatch(addToCartArray(data));
          } else {
            ToastPopup({ text: "product not added something went wrong" });
          }
        })
        .catch(() => {
          setError(true);
          ToastPopup({ text: "product not added something went wrong" });
          setQtyLoading(false);
        });
    }
  };
  useEffect(() => {
    if (error) {
      setError(true);
    } else {
      setError(false);
    }
  }, [error]);
  const trendingSearch = () => {};
  useEffect(() => {
    const newData = {
      conversationId: convId,
      text: "trandingSearch",
      clientName: "honeySys",
      voiceFlag: false,
      isChatVisible: false,
    };

    if (convId && botType && convId !== "" && botType !== "") {
      setLoading(true);
      dispatch(getChatData({ newData, botType }))
        .then((data) => {
          let trendingData = data?.payload?.data?.activities[0][0];
          if (data && trendingData?.type === "trandingSearch") {
            let search = trendingData?.value?.data;
            if (search && Array.isArray(search)) {
              let trendingSearchArray = search.map((item: any) => {
                return item?.title;
              });
              setTrendingSearchOptions(trendingSearchArray);
            }
          }
        })
        .catch((error) => {
          setLoading(false);
          ToastPopup({ text: "something went wrong" });
          setError(true);
          console.log("err", error);
        });
    }
  }, []);
  const backHandler = () => {
    if (orderProduct.length > 0 && cartData.length > 0) {
      if (cartData.length === orderProduct.length) {
        let valid = true;
        cartData.forEach((item, index) => {
          if (
            item?.productId === orderProduct[index]?.productId &&
            item?.productVariantIndex ===
              orderProduct[index]?.productVariantIndex &&
            item?.quantity === orderProduct[index]?.quantity
          ) {
            valid = false;
            // break;
          } else {
            valid = true;
          }
        });
        if (valid) {
          navigate("/cart");
        } else {
          navigate(-1);
        }
      } else {
        navigate("/cart");
      }
    } else {
      navigate(-1);
    }
  };
  return (
    <>
      <div className="">
        <div className="header h-[72px] overflow-hidden flex items-center justify-evenly flex-shrink-0 px-5 sticky top-0">
          <div className="pt-6">
            <div
              className="flex h-20 pt-4"
              onClick={() => {
                backHandler();
              }}
            >
              <div className="flex items-center h-min cursor-pointer">
                <img
                  src="/images/keyboard_backspace.svg"
                  alt="back"
                  className="cursor-pointer"
                  color="black"
                  height={24}
                  width={24}
                />
              </div>
            </div>
          </div>
          <div className="flex-1 px-3">
            <input
              name="search"
              id="search"
              value={searchStr}
              className="search-product"
              placeholder="What are you looking for?"
              onInput={(e: any) => {
                setSearchStr(e?.target?.value);
              }}
            ></input>
          </div>
          <div className="mt-1">
            <button className="bg-primary px-2 py-1 rounded-xl">
              <img
                src="/images/search.svg"
                alt="search"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
        {!Error ? (
          <>
            <div className="mt-2 px-2">
              {searchStr ? (
                <>
                  <div className="flex text-[12px]">
                    <span className="font-normal text-secondaryFontColor">
                      Showing results for "
                    </span>
                    <span className="font-semibold">{searchStr}</span>
                    <span className="font-normal text-secondaryFontColor">
                      "
                    </span>
                  </div>
                  {!Loading ? (
                    <>
                      <div>
                        {Array.isArray(searchList) && searchList.length > 0 ? (
                          searchList.map((data: any, index: number) => (
                            <div className="my-4" key={index}>
                              <ProductCard
                                key={index}
                                addBtn={<AddBtn subCategory={data?.variants} />}
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
                            </div>
                          ))
                        ) : (
                          <div className="mt-2">Not found</div>
                        )}
                      </div>
                      <DrawerModal
                        isOpen={Modal}
                        onClose={() => {
                          setModal(false);
                        }}
                      >
                        <div>
                          {varient?.map((item: any, index: number) => (
                            <ProductCard
                              key={index}
                              image={
                                <img
                                  src={item?.imageSrc}
                                  alt=""
                                  className="h-[60px] w-[60px] !rounded-md mb-1"
                                  onClick={() =>
                                    navigate(`/PDP/${item?.productId}`)
                                  }
                                />
                              }
                              title={`${item?.productName} - ${item?.value} ${item?.unitName}`}
                              price={`₹ ${item?.price}`}
                              className="gap-[10%]"
                              addBtn={
                                <input
                                  type="radio"
                                  id="html"
                                  name="fav_language"
                                  value="HTML"
                                  className="w-[24px] h-[24px] border-2 bg-[#505050] !opacity-100 shadow-none focus-visible:outline-none checked:bg-primary checked:hover:bg-primary checked:active:bg-primary checked:focus:bg-primary focus:bg-primary focus:outline-none focus:ring-primary"
                                  onClick={() => {
                                    let qua = 1;
                                    if (item) {
                                      let findData = QuantityHandler(
                                        cart,
                                        item
                                      );
                                      if (findData) {
                                        qua = findData.quantity + 1;
                                      }
                                    }
                                    if (item?.minPurchaseLimit > qua) {
                                      qua = item?.minPurchaseLimit;
                                    }

                                    if (
                                      item?.stockBalance < qua ||
                                      (item?.purchaseLimit != 0 &&
                                        qua > item?.purchaseLimit)
                                    ) {
                                      searchToastModal({
                                        text: "This product stock is limited",
                                      });
                                      return;
                                    } else {
                                      setCartItem({
                                        productId: item?.productId,
                                        varientId: item?.id,
                                        storeId: storeId,
                                        productVariantIndex:
                                          item?.productVariantIndex,
                                        quantity: qua,
                                        cartId: cartId,
                                      });
                                    }
                                  }}
                                />
                              }
                            />
                          ))}

                          <div className="flex justify-center gap-5 mt-5">
                            <Button
                              type="secondary"
                              className="border-[#C90303] text-[#C90303] py-4 w-full"
                              onClick={() => {
                                setCartItem({});
                                setModal(false);
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              className="!bg-primary text-white py-4 w-full"
                              onClick={() => {
                                if (
                                  cartItem?.productId &&
                                  cartItem?.varientId &&
                                  cartItem?.productId !== "" &&
                                  cartItem?.varientId !== ""
                                ) {
                                  api(cartItem);
                                  setModal(false);
                                } else {
                                  alert("please select product");
                                }
                              }}
                            >
                              Add item
                            </Button>
                          </div>
                        </div>
                      </DrawerModal>
                    </>
                  ) : (
                    <div className="px-2 pt-2">Loading...</div>
                  )}
                </>
              ) : (
                <>
                  <span className="text-[12px] font-normal text-secondaryFontColor">
                    Are you looking for
                  </span>
                  <div className="mt-2">
                    {Array.isArray(trendingSearchOptions) &&
                    trendingSearchOptions.length > 0 ? (
                      trendingSearchOptions.map((items: any, index: number) => (
                        <>
                          <div
                            key={index}
                            className="flex"
                            onClick={() => setSearchStr(items)}
                          >
                            <img
                              src="/images/searchBlack.svg"
                              alt="searchblack"
                              width={20}
                              height={20}
                            ></img>
                            <div className="ml-3 text-[12px] leading-10">
                              {items}
                            </div>
                          </div>
                          <hr className="border-b-1"></hr>
                        </>
                      ))
                    ) : (
                      <div>search...</div>
                    )}
                  </div>
                </>
              )}
            </div>
            {qtyLoading && (
              <div className="cartLoader">
                <div className="cartLoader-text">Loading...</div>
              </div>
            )}
          </>
        ) : (
          <div className="px-2 pt-2">something went wrong</div>
        )}
      </div>
      {/* <Toaster /> */}
    </>
  );
};

export default SearchProduct;
