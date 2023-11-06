import { useEffect, useState } from "react";
import "./searchProduct.css";
import { Button, DrawerModal, ProductCard } from "@polynomialai/alpha-react";
import BackButton from "../../components/Button/BackButton";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { addToCartArray, getChatData } from "../../slices/homeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const SearchProduct = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const storeId = useAppSelector((state) => state.home.storeId);
  const convId = useAppSelector((state) => state.bot.convId);
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
  const [recentSearchOptions, setRecentSearchOptions] = useState([
    "Fresh Tomatoes",
    "Casual Shirt",
    "Apparels",
    "Watches",
    "Car Care",
  ]);
  const [debounceTimeout, setDebounceTimeout] = useState<any>(null);
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

          if (data && searchData?.type === "searchProduct") {
            let searchItems = searchData?.value?.data;
            setSearchList(searchItems);
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
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
        .then((data) => {
          setQtyLoading(false);
        })
        .catch(() => {
          setError(true);
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
  return (
    <>
      <div className="">
        <div className="header h-[72px] overflow-hidden flex items-center justify-evenly flex-shrink-0 px-5">
          <div className="pt-6">
            <BackButton noTitle={true} />
          </div>
          <div className="flex-1 px-3">
            <input
              name="search"
              id="search"
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
                        {searchList.map((data: any, index: number) => (
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
                        ))}
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
                                  dispatch(addToCartArray(cartItem));
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
                    {recentSearchOptions.map((items: any, index: number) => (
                      <>
                        <div key={index} className="flex">
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
                    ))}
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
