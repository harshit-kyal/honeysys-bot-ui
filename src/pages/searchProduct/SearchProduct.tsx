import { useState } from "react";
import "./searchProduct.css";
import { ProductCard } from "@polynomialai/alpha-react";
import BackButton from "../../components/Button/BackButton";

const SearchProduct = () => {
  const [searchStr, setSearchStr] = useState("");
  const [recentSearchOptions, setRecentSearchOptions] = useState([
    "Fresh Tomatoes",
    "Casual Shirt",
    "Apparels",
    "Watches",
    "Car Care",
  ]);
  const [searchList, setSearchList] = useState([
    { imageSrc: "/images/vegetables.svg", title: "Fresh Cauliflower" },
    { imageSrc: "/images/vegetables.svg", title: "Fresh Cabbage " },
    { imageSrc: "/images/vegetables.svg", title: "Fresh Spinach" },
    { imageSrc: "/images/vegetables.svg", title: "Fresh Broccoli" },
    { imageSrc: "/images/vegetables.svg", title: "Fresh Arugula" },
  ]);
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
              {searchList.map((items: any, index: number) => (
                <div className="my-4" key={index}>
                  <ProductCard
                    title={items.title}
                    image={<img src={items.imageSrc} alt="" />}
                    addBtn={<></>}
                  />
                </div>
              ))}
            </div>
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
