import PageHeader from "../../components/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import { CategorieData } from "../../constants/HomeConst";
import BadgeCard from "../../components/Resuable/BadgeCard";
import { ProductDropDown } from "@polynomialai/alpha-react";
import { fruitsVegetables } from "../../constants/HomeConst";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCategoriesUI } from "../../slices/rootSlice";

const Categories = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const headerParams: any = searchParams.get("categoriesData");
    const data = JSON.parse(decodeURIComponent(headerParams));
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
  }, [window.location.search]);

  return (
    <div className="h-screen pt-[60px]">
      <PageHeader title="Categories" />
      <div className="flex gap-[10px] px-5 py-[10px] overflow-auto">
        {CategorieData.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/categories/${item.id}`);
            }}
          >
            <BadgeCard text={item.title} active={id === item.id} />
          </div>
        ))}
      </div>
      <div>
        {fruitsVegetables.map((item: any, index: number) => (
          <ProductDropDown
            key={index}
            buttonCN="w-[100%]"
            buttonTextCN={
              "!font-categoriesTitleWeight text-categoriesTitleColor"
            }
            displayItem={{
              image: (
                <img
                  src={item.imageSrc}
                  className="h-[60px] w-[60px] rounded-md border border-categoriesImageBorderColor"
                  alt=""
                />
              ),
              title: item.title,
            }}
            optionTextCN="!font-categoriesTitleWeight text-categoriesTitleColor"
            options={item.products.map((i: any, index: number) => ({
              image: (
                <img
                  src={item.imageSrc}
                  className="h-[60px] w-[60px] rounded-md border border-categoriesImageBorderColor"
                  alt=""
                />
              ),
              title: i.title,
              onClick: () => {
                navigate(`/viewProduct/${i.id}`);
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
