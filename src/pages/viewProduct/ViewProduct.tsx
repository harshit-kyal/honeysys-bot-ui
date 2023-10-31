import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { Button, DrawerModal, ProductCard } from "@polynomialai/alpha-react";
import BadgeCard from "../../components/Resuable/BadgeCard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToCartArray, getChatData } from "../../slices/homeSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ViewProduct = () => {
  const dispatch = useAppDispatch();
  const storeId = useAppSelector((state) => state.home.storeId);
  const error = useAppSelector((state) => state.home.error);
  const [Modal, setModal] = useState<boolean>(false);
  const convId = useAppSelector((state) => state.bot.convId);
  const cartId = useAppSelector((state) => state.home.cartId);
  const botType = useAppSelector((state) => state.bot.botType);
  const [productData, setProductData] = useState<any>([]);
  const [categoriesCatalog, setCategoriesCatalog] = useState<any>([]);
  const [cartItem, setCartItem] = useState<any>({});
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [qtyLoading, setQtyLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const categoryIds = location?.state?.categoryIds;
  const subcategoryIds = location?.state?.subcategoryIds;
  const subCategoryTitle = location?.state?.title;
  const category = async () => {
    let newData = {
      conversationId: convId,
      text: "viewProduct",
      isChatVisible: false,
      voiceFlag: false,
      data: {
        storeId: storeId,
        categoryIds: categoryIds,
        subcategoryIds: subcategoryIds,
      },
    };

    if (convId && botType && convId !== "" && botType !== "") {
      await dispatch(getChatData({ newData, botType }))
        .then((data) => {
          if (data?.payload?.data?.activities[0][0]?.type === "viewProduct") {
            setProductData(data?.payload?.data?.activities[0][0]?.value?.data);
            setError(false);
          }
        })
        .catch(() => {
          setError(true);
        });
    }
  };

  const categoryCatalog = async () => {
    let newData = {
      conversationId: convId,
      text: "viewCategoryCatalog",
      voiceFlag: false,
      isChatVisible: false,
      data: {
        storeId: storeId,
      },
    };
    if (convId && botType && convId !== "" && botType !== "") {
      await dispatch(getChatData({ newData, botType }))
        .then((data) => {
          if (
            data &&
            data?.payload?.data?.activities[0][0]?.type ===
              "viewCategoryCatalog"
          ) {
            setError(false);
            setCategoriesCatalog(
              data?.payload?.data?.activities[0][0]?.value?.data
            );
          }
        })
        .catch(() => {
          setError(true);
        });
    }
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
          setQtyLoading(false);
        });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        Promise.all([category(), categoryCatalog()]).then((res) => {
          setLoading(false);
        });
      } catch (error) {
        setLoading(false);
        console.error("Error in fetchData:", error);
      }
    };
    fetchData();
  }, []);
  const [varient, setVarient] = useState<any>([]);
  useEffect(() => {
    if (error) {
      setError(true);
    } else {
      setError(false);
    }
  }, [error]);

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
  return (
    <div className="h-screen pt-[60px]">
      <PageHeader title={subCategoryTitle ? subCategoryTitle : "..."} />
      {!Loading && !Error ? (
        <>
          <div className="pb-12">
            {productData?.map((data: any, index: number) => (
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
            ))}
          </div>
          <div className="flex w-full px-5 py-2 bg-[#F1F1F1] gap-3 fixed bottom-0 overflow-x-auto">
            {categoriesCatalog?.map((item: any, index: number) => (
              <div
                key={index}
                onClick={() => {
                  navigate(`/categories/${item?.id}`);
                }}
              >
                <BadgeCard
                  text={item?.title}
                  active={item?.id == categoryIds}
                />
              </div>
            ))}
          </div>
          {/* <div className="flex w-full px-5 py-2 bg-[#F1F1F1] gap-3 fixed bottom-0 overflow-x-auto">
            <BadgeCard text="Back to category selection" active={false} />
            <BadgeCard text="Electronics for you" active={false} />
          </div> */}
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
                    // ${item?.productId}
                  }
                  title={`${item?.productName} - ${item?.value} ${item?.unitName}`}
                  // title={`${productDetail?.title} - ${item?.option}`}
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
                        console.log("item",item)
                        let qua = 1;
                        if (item?.minPurchaseLimit > qua) {
                          qua = item?.minPurchaseLimit;
                        }
                        if (
                          item?.stockBalance < qua ||
                          (item?.purchaseLimit != 0 &&
                            qua > item?.purchaseLimit)
                        ) {
                          toastModal({ text: "This product stock is limited" });
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
                      }
                    }
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

export default ViewProduct;
