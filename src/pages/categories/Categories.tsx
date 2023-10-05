import PageHeader from "../../components/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import { CategorieData } from "../../constants/HomeConst";
import BadgeCard from "../../components/Resuable/BadgeCard";
import { ProductDropDown } from "@polynomialai/alpha-react";
import { fruitsVegetables } from "../../constants/HomeConst";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCategoriesUI } from "../../slices/rootSlice";
import { useAppSelector } from "../../app/hooks";
import { pageData } from "../../api";

const Categories = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    const categoryData = {
      conversationId: convId,
      text: "viewCategoryCatalog",
      voiceFlag: false,
    };
    if (convId && botType && convId !== "" && botType !== "") {
      pageData(categoryData, botType).then((data) => {
        if (data?.data?.activities[0]?.type === "viewCategoryCatalog") {
          setCategoriesCatalog(data?.data?.activities[0]?.value?.data);
        }
      });
    }
    const subCategoryData = {
      conversationId: convId,
      text: "viewCategory",
      voiceFlag: false,
    };
    if (convId && botType && convId !== "" && botType !== "") {
      pageData(subCategoryData, botType).then((data) => {
        if (data?.data?.activities[0]?.type === "viewCategory") {
          setSubCategories(data?.data?.activities[0]?.value?.data);
        }
      });
    }
  };
  useEffect(() => {
    catalogData();
  }, []);

  return (
    <div className="h-screen pt-[60px]">
      <PageHeader title="Categories" />
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
    </div>
  );
};

export default Categories;
