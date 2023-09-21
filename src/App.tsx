import { useEffect } from "react";
import "./App.css";
import Routing from "./routes/Routing";
import { useAppSelector } from "./app/hooks";

function App() {
  const color = useAppSelector((state) => state.root.color);
  const overallThemeUI = useAppSelector((state) => state.root.overallThemeUI);
  const conversationUI = useAppSelector((state) => state.root.conversationUI);
  const cartUI = useAppSelector((state) => state.root.cartUI);
  const CatalogUI = useAppSelector((state) => state.root.CatalogUI);
  const CategoriesUI = useAppSelector((state) => state.root.CategoriesUI);

  const searchParams = new URLSearchParams(window.location.search);
  const cartTemplate = searchParams.get("cartTemplate");

  console.log("cartTemplate", cartTemplate);
  useEffect(() => {
    // error color
    document.documentElement.style.setProperty("--error", color.error);

    // overallThemeUI
    document.documentElement.style.setProperty(
      "--primary",
      overallThemeUI.theme[0]
    );
    document.documentElement.style.setProperty(
      "--secondary",
      overallThemeUI.theme[1]
    );
    document.documentElement.style.setProperty(
      "--background",
      overallThemeUI.theme[2]
    );
    document.documentElement.style.setProperty(
      "--botIcons",
      overallThemeUI.botIcons
    );
    localStorage.setItem("botIcons", overallThemeUI.botIcons);
    document.documentElement.style.setProperty(
      "--actionButtonBorder",
      overallThemeUI.actionButtonBorder
    );

    // conversationUI
    document.documentElement.style.setProperty(
      "--fontFamily",
      conversationUI.fontFamily
    );
    document.documentElement.style.setProperty(
      "--conversationFontStyle",
      conversationUI.conversationFontStyle
    );
    document.documentElement.style.setProperty(
      "--timeStampFontStyle",
      conversationUI.timeStampFontStyle
    );
    document.documentElement.style.setProperty(
      "--greetingMessage",
      conversationUI.greetingMessage
    );
    localStorage.setItem("greetingMessage", conversationUI.greetingMessage);

    // Cart
    document.documentElement.style.setProperty(
      "--cartImageBorderColor",
      cartUI.imageBorderColor
    );
    document.documentElement.style.setProperty(
      "--cartTitleWeight",
      cartUI.titleWeight
    );
    document.documentElement.style.setProperty(
      "--cartTitleColor",
      cartUI.titleColor
    );
    document.documentElement.style.setProperty(
      "--cartQuantityWeight",
      cartUI.quantityWeight
    );
    document.documentElement.style.setProperty(
      "--cartPriceWeight",
      cartUI.priceWeight
    );
    document.documentElement.style.setProperty(
      "--cartPriceColor",
      cartUI.priceColor
    );
    document.documentElement.style.setProperty(
      "--cartPriceSmallSize",
      (parseInt(cartUI.priceSize) - 2).toString() + "px"
    );
    document.documentElement.style.setProperty(
      "--cartPriceSize",
      cartUI.priceSize
    );

    // Catalog
    document.documentElement.style.setProperty(
      "--categoryBackDrop",
      CatalogUI.categoryBackDrop
    );
    document.documentElement.style.setProperty(
      "--catalogImageBorderColor",
      CatalogUI.youMayLike.imageBorderColor
    );
    document.documentElement.style.setProperty(
      "--catalogPriceWeight",
      CatalogUI.youMayLike.priceWeight
    );
    document.documentElement.style.setProperty(
      "--catalogPriceColor",
      CatalogUI.youMayLike.priceColor
    );
    document.documentElement.style.setProperty(
      "--catalogTitleWeight",
      CatalogUI.youMayLike.titleWeight
    );
    document.documentElement.style.setProperty(
      "--catalogTitleColor",
      CatalogUI.youMayLike.titleColor
    );

    // Categories
    document.documentElement.style.setProperty(
      "--quickReplyBorderRadius",
      CategoriesUI.quickReplyBorderRadius
    );
    document.documentElement.style.setProperty(
      "--categoriesImageBorderColor",
      CategoriesUI.drawer.imageBorderColor
    );
    document.documentElement.style.setProperty(
      "--categoriesTitleWeight",
      CategoriesUI.drawer.titleWeight
    );
    document.documentElement.style.setProperty(
      "--categoriesTitleColor",
      CategoriesUI.drawer.titleColor
    );
  }, [overallThemeUI, conversationUI, cartUI, CatalogUI, CategoriesUI]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const reviewToken = searchParams.get("token");
    console.log("window.location.href",window.location.href)
    reviewToken && localStorage.setItem("reviewToken", reviewToken);
  }, [window.location.search]);

  return <Routing />;
}

export default App;
