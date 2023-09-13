import PageHeader from "../../components/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import { CategorieData } from "../../constants/HomeConst";
import BadgeCard from "../../components/Resuable/BadgeCard";
import { ProductDropDown } from "@polynomialai/alpha-react";
import { fruitsVegetables } from "../../constants/HomeConst";
import { useEffect, useState } from "react";

const Categories = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [headerTemplate, setHeaderTemplate] = useState<any>("");
  const [productViewTemplate, setProductViewTemplate] = useState<any>("");
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const headerParams: any = searchParams.get("headerTemplate");
    setHeaderTemplate(JSON.parse(decodeURIComponent(headerParams)));
    const productParams: any = searchParams.get("productViewTemplate");
    setProductViewTemplate(JSON.parse(decodeURIComponent(productParams)));
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
            <BadgeCard
              text={item.title}
              borderCn={headerTemplate?.borderCn}
              active={id === item.id}
            />
          </div>
        ))}
      </div>
      <div>
        {fruitsVegetables.map((item: any, index: number) => (
          <ProductDropDown
            key={index}
            buttonCN="w-[100%]"
            buttonTextCN={productViewTemplate?.titleCn}
            displayItem={{
              image: (
                <img
                  src={item.imageSrc}
                  className="h-[60px] w-[60px] rounded-md"
                  alt=""
                />
              ),
              title: item.title,
            }}
            options={item.products.map((i: any, index: number) => ({
              image: (
                <img
                  src={item.imageSrc}
                  className="h-[60px] w-[60px] rounded-md"
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
