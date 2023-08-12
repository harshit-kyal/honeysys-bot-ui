import React from "react";
import PageHeader from "../../components/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import { CategorieData } from "../../constants/HomeConst";
import BadgeCard from "../../components/Resuable/BadgeCard";

const Categories = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="h-screen pt-[60px]">
      <PageHeader title="Categories" />
      <div className="flex gap-[10px] px-5 py-[10px] overflow-auto">
        {CategorieData.map((item: any) => (
          <div
            onClick={() => {
              navigate(`/categories/${item.id}`);
            }}
          >
            <BadgeCard text={item.title} active={id === item.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
