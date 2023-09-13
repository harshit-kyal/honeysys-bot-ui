import { useEffect } from "react";
import "./App.css";
import Routing from "./routes/Routing";
import { useAppSelector } from "./app/hooks";

function App() {
  const color = useAppSelector((state) => state.root.color);
  const radius = useAppSelector((state) => state.root.radius);
  const Catalog = useAppSelector((state) => state.root.Catalog);
  const Cart = useAppSelector((state) => state.root.Cart);

  const searchParams = new URLSearchParams(window.location.search);
  const cartTemplate = searchParams.get("cartTemplate");

  console.log("cartTemplate", cartTemplate);
  useEffect(() => {
    document.documentElement.style.setProperty("--primary", color.primary);
    document.documentElement.style.setProperty("--secondary", color.secondary);
    document.documentElement.style.setProperty(
      "--background",
      color.background
    );
    document.documentElement.style.setProperty("--error", color.error);
    document.documentElement.style.setProperty("--radius", radius);
    document.documentElement.style.setProperty(
      "--shadow",
      Catalog.categoryTemplate
    );

    // Cart
    document.documentElement.style.setProperty(
      "--cartImgBorderColor",
      Cart.imgBorderColor
    );
    document.documentElement.style.setProperty(
      "--cartTitleSize",
      Cart.titleSize.toString() + "px"
    );
    document.documentElement.style.setProperty(
      "--cartTitleSmallSize",
      (Cart.titleSize - 2).toString() + "px"
    );
    document.documentElement.style.setProperty(
      "--cartTitleWeight",
      Cart.titleWeight.toString()
    );
    document.documentElement.style.setProperty(
      "--cartQuantitySize",
      Cart.quantitySize.toString() + "px"
    );
    document.documentElement.style.setProperty(
      "--cartQuantitySmallSize",
      (Cart.quantitySize - 2).toString() + "px"
    );
    document.documentElement.style.setProperty(
      "--cartQuantityWeight",
      Cart.quantityWeight.toString()
    );
    document.documentElement.style.setProperty(
      "--cartPriceSize",
      Cart.priceSize.toString() + "px"
    );
    document.documentElement.style.setProperty(
      "--cartPriceSmallSize",
      (Cart.priceSize - 2).toString() + "px"
    );
    document.documentElement.style.setProperty(
      "--cartPriceWeight",
      Cart.priceWeight.toString()
    );
  }, []);
  return <Routing />;
}

export default App;
