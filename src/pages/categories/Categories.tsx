import PageHeader from "../../components/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import BadgeCard from "../../components/Resuable/BadgeCard";
import { ProductDropDown } from "@polynomialai/alpha-react";
import { useEffect, useState } from "react";
import { setCategoriesUI } from "../../slices/rootSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getChatData } from "../../slices/homeSlice";

const Categories = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const storeId = useAppSelector((state) => state.home.storeId);
  const convId = useAppSelector((state) => state.bot.convId);
  const botType = useAppSelector((state) => state.bot.botType);
  const [categoriesCatalog, setCategoriesCatalog] = useState<any>([]);
  const [subCategories, setSubCategories] = useState<any>([]);
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const headerParams: any = searchParams.get("categoriesData");
    const data = JSON.parse(decodeURIComponent(headerParams));
    if (headerParams) {
      dispatch(
        setCategoriesUI({
          quickReplyBorderRadius: data?.borderRadius,
          drawer: {
            imageBorderColor: "#E6E6E6",
            titleWeight: data?.titleWeight,
            titleColor: data?.titleColor,
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
      data: {
        store_id: storeId,
      },
    };
    if (convId && botType && convId !== "" && botType !== "") {
      dispatch(getChatData({ newData, botType })).then((data) => {
        if (data?.payload?.data?.activities[0]?.type === "storeCheck") {
          setCategoriesCatalog(data?.payload?.data?.activities[0]?.value?.data);
        }
      });
    }
    newData = {
      conversationId: convId,
      text: "viewCategory",
      voiceFlag: false,
      data: {
        store_id: storeId,
      },
    };
    if (convId && botType && convId !== "" && botType !== "") {
      dispatch(getChatData({ newData, botType })).then((data) => {
        if (data?.payload?.data?.activities[0]?.type === "viewCategory") {
          setSubCategories(data?.payload?.data?.activities[0]?.value?.data);
        }
      });
    }
  };
  useEffect(() => {
    catalogData();
  }, []);
  const loading = useAppSelector((state) => state.home.loading);
  const error = useAppSelector((state) => state.home.error);
  return (
    <div className="h-screen pt-[60px]">
      <PageHeader title="Categories" />
      {!loading && !error ? (
        <>
          <div className="flex gap-[10px] px-5 py-[10px] overflow-auto">
            {categoriesCatalog.map((item: any, index: number) => (
              <div
                key={index}
                onClick={() => {
                  navigate(`/categories/${item?.id}`);
                }}
              >
                <BadgeCard text={item?.title} active={id === item?.id} />
              </div>
            ))}
          </div>
          <div>
            {subCategories.map((item: any, index: number) => (
              <ProductDropDown
                key={index}
                buttonCN="w-[100%]"
                buttonTextCN={
                  "!font-categoriesTitleWeight text-categoriesTitleColor"
                }
                displayItem={{
                  image: (
                    <img
                      src={item?.imageSrc}
                      className="h-[60px] w-[60px] rounded-md border border-categoriesImageBorderColor"
                      alt=""
                    />
                  ),
                  title: item?.title,
                }}
                optionTextCN="!font-categoriesTitleWeight text-categoriesTitleColor"
                options={item.products.map((i: any, index: number) => ({
                  image: (
                    <img
                      key={index}
                      src={i?.imageSrc}
                      className="h-[60px] w-[60px] rounded-md border border-categoriesImageBorderColor"
                      alt=""
                    />
                  ),
                  title: i?.title,
                  onClick: () => {
                    navigate(`/viewProduct/${i?.id}`);
                  },
                }))}
                optionsContainerCN="w-[100%]"
              />
            ))}
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

export default Categories;
