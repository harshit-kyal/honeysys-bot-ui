import { MouseEventHandler } from "react";

export interface RootSliceType {
  loading: boolean;
  error: string;
  color: {
    primary: string;
    secondary: string;
    background: string;
    error: string;
  };
  bot: string;
  radius: string;
  Conversations: {
    fontfamily: string;
    fontstyle: string;
    titlesize: number;
    contentsize: number;
    timestampsize: number;
    greetingTemplate: string;
  };

  Cart: {
    cartTemplate: string;
  };

  Catalog: {
    categoryTemplate: string;
    likeSectionTemplate: {
      title: string;
      price: string;
      image: string;
    };
  };

  Categories: {
    categorySectionTemplate: string;
    categoryLikeSectionTemplate: string;
  };
}

export interface CustomButton {
  title: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
}

export interface HomeSliceType {
  loading: boolean;
  error: string;
  locationPermission: boolean;
  locationModal: boolean;
  deniedModal: boolean;
  storeData: any;
}

export interface BotSliceType {
  loading: boolean;
  error: string;
  botInfo: any;
  convId: string;
  botType: string;
}
