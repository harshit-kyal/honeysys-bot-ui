import { MouseEventHandler } from "react";

export interface RootSliceType {
  loading: boolean;
  error: string;
  color: {
    error: string;
  };

  overallThemeUI: {
    theme: [string, string, string];
    botIcons: string;
    actionButtonBorder: string;
  };
  conversationUI: {
    fontFamily: string;
    conversationFontStyle: string;
    timeStampFontStyle: string;
    greetingMessage: string;
  };
  cartUI: {
    imageBorderColor: string;
    titleWeight: string;
    titleColor: string;
    quantityWeight: string;
    priceWeight: string;
    priceSize: string;
    priceColor: string;
  };
  CatalogUI: {
    categoryBackDrop: string;
    youMayLike: {
      imageBorderColor: string;
      titleWeight: string;
      titleColor: string;
      priceWeight: string;
      priceColor: string;
    };
  };
  CategoriesUI: {
    quickReplyBorderRadius: string;
    drawer: {
      imageBorderColor: string;
      titleWeight: string;
      titleColor: string;
    };
  };
}

export interface CustomButton {
  title: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  disable?: boolean;
}

export interface HomeSliceType {
  loading: boolean;
  error: string;
  mobileNo: string;
  otp: number;
  userId: string;
  storeId: string;
  userPincode: number;
  ChatArray: any[];
  locationPermission: boolean;
  locationModal: boolean;
  deniedModal: boolean;
  storeData: any;
  UiUpdate: boolean;
  cart: any[];
  totalQuantity: number;
}

export interface BotSliceType {
  loading: boolean;
  error: string;
  botInfo: any;
  convId: string;
  botType: string;
}
