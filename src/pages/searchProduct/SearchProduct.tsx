import { useEffect, useState } from "react";
import "./searchProduct.css";
import { Button, DrawerModal, ProductCard } from "@polynomialai/alpha-react";
import BackButton from "../../components/Button/BackButton";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
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
      dispatch(getChatData({ newData, botType }))
        .then((data) => {
          let searchData = data?.payload?.data?.activities[0][0];
          console.log("searchData", searchData);
          // if (data && cartData?.type === "getCartId") {
          //   let cartId = cartData?.value?.data?.cartId;
          //   dispatch(setCartId(cartId));
          // }
        })
        .catch((error) => {
          // setLoading(false);
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

  const [searchList, setSearchList] = useState([
    {
      productId: "63160304f83d99dcd297a669",
      categoryId: "636c8a18fce69b00305adb34",
      subCategoryId: "631609909eb8ecdd53730021",
      classificationId: "",
      categoryName: "Dry fruits & Nuts",
      subCategoryName: "Other Dry Fruits",
      classificaitonName: "",
      catalogProductId: "63c8edf85daedc002f4923d3",
      orderValue: 17,
      highlights: [],
      productName: "Aloo Bhukara Plum 50g",
      variantsCount: 1,
      keyWords: [
        "Aloo Bhukara Plum 50g",
        "Aloo Bhukara Plum",
        "Aloo Bhukara",
        "Plum",
        "Dried Plums",
        "AAloo Bhukara",
        "Dried Plum",
        "Dried Prunes",
        "Aloo Bhukara",
        "Alpakoda Pazham",
        "Dry Plums",
      ],
      seo: null,
      storeId: "62df787e6c6e1169d7465ef6",
      urlPath: "aloo-bhukara-plum-50g",
      familyName: "MASALA/SPICES/DRYFRUITS - OTHER DRY FRUITS",
      productType: "FMCG Staples",
      brandName: "RATNADEEP",
      brandId: "6315e118f83d99dcd297a290",
      shortDescription:
        "Aloo Bhukara Plum aids an individual from harmful ultraviolet rays. Additionally, aloo-bukhara aids in developing cardiovascular movements in the body. It could therefore possibly be eaten by patients who have a lower blood pressure than usual. Due to the antioxidants that aloo-bukhara carries, the consumption could possibly be an anti-skin ageing element. It could filter out contagions and result in clearer skin.",
      longDescription:
        "Aloo Bhukara Plum aids an individual from harmful ultraviolet rays. Additionally, aloo-bukhara aids in developing cardiovascular movements in the body. It could therefore possibly be eaten by patients who have a lower blood pressure than usual. Due to the antioxidants that aloo-bukhara carries, the consumption could possibly be an anti-skin ageing element. It could filter out contagions and result in clearer skin.",
      outOfStock: false,
      image: [
        {
          index: 0,
          media: {
            thumbnail: "product/thumbnail/Aloo-Bhukara-Plum-50g-1.jpg",
            media: "product/thumbnail/Aloo-Bhukara-Plum-50g-1.jpg",
            type: "image",
          },
        },
        {
          index: 1,
          media: {
            thumbnail: "product/thumbnail/Aloo-Bhukara-Plum-50g-2.jpg",
            media: "product/thumbnail/Aloo-Bhukara-Plum-50g-2.jpg",
            type: "image",
          },
        },
        {
          index: 2,
          media: {
            thumbnail: "product/thumbnail/Aloo-Bhukara-Plum-50g-3.jpg",
            media: "product/thumbnail/Aloo-Bhukara-Plum-50g-3.jpg",
            type: "image",
          },
        },
      ],
      variants: [
        {
          minPurchaseLimit: 0,
          reservedQuantity: 0,
          salesPrice: "27.00",
          itemCode: "170102422",
          discount: 0,
          bogoOffer: false,
          productVariantIndex: 0,
          buyProduct: 0,
          price: "27.00",
          minUOMValue: "",
          unitId: "6315fa5bf83d99dcd297a532",
          discountType: 1,
          id: "64b877c99127ce50d905d51a",
          taxTemplate: "63738f1c66d6460030f1f154",
          sku: "",
          sohLimit: 1,
          value: "50",
          taxType: "1",
          image: [
            {
              index: 0,
              media: {
                thumbnail: "product/thumbnail/Aloo-Bhukara-Plum-50g-1.jpg",
                media: "product/thumbnail/Aloo-Bhukara-Plum-50g-1.jpg",
                type: "image",
              },
            },
            {
              index: 1,
              media: {
                thumbnail: "product/thumbnail/Aloo-Bhukara-Plum-50g-2.jpg",
                media: "product/thumbnail/Aloo-Bhukara-Plum-50g-2.jpg",
                type: "image",
              },
            },
            {
              index: 2,
              media: {
                thumbnail: "product/thumbnail/Aloo-Bhukara-Plum-50g-3.jpg",
                media: "product/thumbnail/Aloo-Bhukara-Plum-50g-3.jpg",
                type: "image",
              },
            },
          ],
          stockBalanceFlag: true,
          alternateUOM: "",
          unitName: "g",
          stockType: "4",
          allowedScalable: false,
          count: 1,
          lowStockLimit: 1,
          barcodes: ["105020590102"],
          storeUnitName: "g",
          productCode: "",
          stockBalance: 3,
          _id: "64b877c99127ce50d905d51a",
          discountDifference: "0.00",
          purchaseLimit: 12,
        },
      ],
    },
    {
      productId: "636bac7e727b5c0030328647",
      categoryId: "636c8955fce69b00305adb2c",
      subCategoryId: "636d0e487b83080030eef4e7",
      classificationId: "",
      categoryName: "Snacks",
      subCategoryName: "Namkeens",
      classificaitonName: "",
      catalogProductId: "63cfe04c15704a002f04850d",
      orderValue: 2,
      highlights: [],
      productName: "Haldiram Nagpur Aloo Bhujia 200g",
      variantsCount: 1,
      keyWords: [
        "Haldiram Nagpur Aloo Bhujia 150g",
        "Haldiram Nagpur",
        "Aloo Bhujia",
        "Haldiram",
        "Nagpur Aloo Bhujia",
        "Haldiram Aloo Bhujia",
      ],
      seo: null,
      storeId: "62df787e6c6e1169d7465ef6",
      urlPath: "haldiram-nagpur-aloo-bhujia-200g",
      familyName: "READY FOODS - BRANDED NAMKEENS",
      productType: "FMCG Food",
      brandName: "HALDIRAM NAGPUR",
      brandId: "6315e118f83d99dcd297a2be",
      shortDescription:
        "Haldiram Nagpur Aloo Bhujia is prepared from potatoes and special spice, this snack has a nice highly spiced flavour. The tastes enormous with any food you have. It is a crunchy, tasty and flavourful snack that brings you an authentic taste originated from Bikaner. Comes from the perfection of making Bhujia using quality ingredients. The crispy texture and combination of spices gives you a great taste.",
      longDescription:
        "Haldiram Nagpur Aloo Bhujia is prepared from potatoes and special spice, this snack has a nice highly spiced flavour. The tastes enormous with any food you have. It is a crunchy, tasty and flavourful snack that brings you an authentic taste originated from Bikaner. Comes from the perfection of making Bhujia using quality ingredients. The crispy texture and combination of spices gives you a great taste.",
      outOfStock: false,
      image: [
        {
          index: 0,
          media: {
            thumbnail:
              "product/thumbnail/Haldiram-Nagpur-Aloo-Bhujia-150G-1.jpg",
            media: "product/thumbnail/Haldiram-Nagpur-Aloo-Bhujia-150G-1.jpg",
            type: "Image",
          },
        },
        {
          index: 1,
          media: {
            thumbnail:
              "product/thumbnail/Haldiram-Nagpur-Aloo-Bhujia-150G-2.jpg",
            media: "product/thumbnail/Haldiram-Nagpur-Aloo-Bhujia-150G-2.jpg",
            type: "Image",
          },
        },
        {
          index: 2,
          media: {
            thumbnail:
              "product/thumbnail/Haldiram-Nagpur-Aloo-Bhujia-150G-3.jpg",
            media: "product/thumbnail/Haldiram-Nagpur-Aloo-Bhujia-150G-3.jpg",
            type: "Image",
          },
        },
        {
          index: 3,
          media: {
            thumbnail:
              "product/thumbnail/Haldiram-Nagpur-Aloo-Bhujia-150G-4.jpg",
            media: "product/thumbnail/Haldiram-Nagpur-Aloo-Bhujia-150G-4.jpg",
            type: "Image",
          },
        },
      ],
      variants: [
        {
          minPurchaseLimit: 0,
          reservedQuantity: 0,
          salesPrice: "52.00",
          itemCode: "120101032",
          discount: 0,
          minimumScaleValue: null,
          bogoOffer: false,
          productVariantIndex: 0,
          buyProduct: 0,
          price: "52.00",
          minUOMValue: "",
          unitId: "6315fa5bf83d99dcd297a532",
          discountType: 1,
          id: "64b877ca9127ce50d905ddee",
          taxTemplate: "63738f1c66d6460030f1f154",
          sku: "",
          sohLimit: 1,
          value: "200",
          taxType: "1",
          image: [
            {
              index: 0,
              media: {
                thumbnail:
                  "product/thumbnail/Haldiram-Nagpur-Aloo-Bhujia-150G-1.jpg",
                media:
                  "product/thumbnail/Haldiram-Nagpur-Aloo-Bhujia-150G-1.jpg",
                type: "Image",
              },
            },
            {
              index: 1,
              media: {
                thumbnail:
                  "product/thumbnail/Haldiram-Nagpur-Aloo-Bhujia-150G-2.jpg",
                media:
                  "product/thumbnail/Haldiram-Nagpur-Aloo-Bhujia-150G-2.jpg",
                type: "Image",
              },
            },
            {
              index: 2,
              media: {
                thumbnail:
                  "product/thumbnail/Haldiram-Nagpur-Aloo-Bhujia-150G-3.jpg",
                media:
                  "product/thumbnail/Haldiram-Nagpur-Aloo-Bhujia-150G-3.jpg",
                type: "Image",
              },
            },
            {
              index: 3,
              media: {
                thumbnail:
                  "product/thumbnail/Haldiram-Nagpur-Aloo-Bhujia-150G-4.jpg",
                media:
                  "product/thumbnail/Haldiram-Nagpur-Aloo-Bhujia-150G-4.jpg",
                type: "Image",
              },
            },
          ],
          stockBalanceFlag: true,
          alternateUOM: "",
          unitName: "g",
          stockType: "4",
          allowedScalable: false,
          count: 1,
          lowStockLimit: 1,
          barcodes: ["8904004400762"],
          storeUnitName: "g",
          productCode: "",
          alternateSaleUnit: null,
          stockBalance: 26,
          _id: "64b877ca9127ce50d905ddee",
          discountDifference: "0.00",
          purchaseLimit: 12,
        },
      ],
    },
  ]);
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
  const toastModal = ({ text = "" }: { text: string }) => {
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
    // setQtyLoading(true);
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
          // setQtyLoading(false);
        })
        .catch(() => {
          // setQtyLoading(false);
        });
    }
  };
  return (
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
            <img src="/images/search.svg" alt="search" width={24} height={24} />
          </button>
        </div>
      </div>
      <div className="mt-2 px-2">
        {searchStr ? (
          <>
            <div className="flex text-[12px]">
              <span className="font-normal text-secondaryFontColor">
                Showing results for "
              </span>
              <span className="font-semibold">{searchStr}</span>
              <span className="font-normal text-secondaryFontColor">"</span>
            </div>
            <div>
              {searchList.map((data: any, index: number) => (
                <div className="my-4" key={index}>
                  <ProductCard
                    key={index}
                    addBtn={<AddBtn subCategory={data?.variants} />}
                    className="w-full my-[6px] mb-3 px-5"
                    image={
                      <img
                        src={data?.image[0]?.media?.thumbnail}
                        className="object-cover rounded-lg w-[60px] h-[60px]"
                        alt=""
                      />
                    }
                    onClick={() => {}}
                    title={data?.productName}
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
                        onClick={() => navigate(`/PDP/${item?.productId}`)}
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
                          console.log("item", item);
                          let qua = 1;
                          if (item?.minPurchaseLimit > qua) {
                            qua = item?.minPurchaseLimit;
                          }
                          if (
                            item?.stockBalance < qua ||
                            (item?.purchaseLimit != 0 &&
                              qua > item?.purchaseLimit)
                          ) {
                            toastModal({
                              text: "This product stock is limited",
                            });
                            return;
                          } else {
                            setCartItem({
                              productId: item?.productId,
                              varientId: item?.id,
                              storeId: storeId,
                              productVariantIndex: item?.productVariantIndex,
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
                    <div className="ml-3 text-[12px] leading-10">{items}</div>
                  </div>
                  <hr className="border-b-1"></hr>
                </>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchProduct;
