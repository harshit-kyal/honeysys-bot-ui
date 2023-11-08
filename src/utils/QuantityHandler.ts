// import { useAppSelector } from "../app/hooks";

export const QuantityHandler = (cart:any,product: any) => {
  // const cart = useAppSelector((state) => state.home.cart);
  let findData = cart.find(
    (i: any) =>
      i?.productId === product?.productId && i?.varientId === product?.id
  );
  if (findData) {
    return findData;
  }
};
