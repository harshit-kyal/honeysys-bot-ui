export interface RootSliceType {
  loading: boolean;
  error: string;
  color: {
    primary: string;
    secondary: string;
    background: string;
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
    likeSectionTemplate: string;
  };

  Categories: {
    categorySectionTemplate: string;
    categoryLikeSectionTemplate: string;
  };
}
