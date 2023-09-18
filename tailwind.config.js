/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // screens: {
      //   xs: { min: "360px" },
      // },
      fontFamily: {
        fontFamily: "var(--fontFamily)",
      },
      fontSize: {
        cartPriceSize: "var(--cartPriceSize)",
        cartPriceSmallSize: "var(--cartPriceSmallSize)",
      },
      fontWeight: {
        conversationFontStyle: "var(--conversationFontStyle)",
        timeStampFontStyle: "var(--timeStampFontStyle)",
        cartTitleWeight: "var(--cartTitleWeight)",
        cartQuantityWeight: "var(--cartQuantityWeight)",
        cartPriceWeight: "var(--cartPriceWeight)",
        catalogPriceWeight: "var(--catalogPriceWeight)",
        catalogTitleWeight: "var(--catalogTitleWeight)",
        categoriesTitleWeight: "var(--categoriesTitleWeight)",
      },
      borderColor: {
        cartImageBorderColor: 'var(--cartImageBorderColor)',
        catalogImageBorderColor: "var(--catalogImageBorderColor)",
        categoriesImageBorderColor: "var(--categoriesImageBorderColor)",
      },
      textColor: {
        cartTitleColor: "var(--cartTitleColor)",
        cartPriceColor: "var(--cartPriceColor)",
        catalogPriceColor: "var(--catalogPriceColor)",
        catalogTitleColor: "var(--catalogTitleColor)",
        categoriesTitleColor: "var(--categoriesTitleColor)",
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        background: "var(--background)",
        error: "#C25E5E",
      },
      borderRadius: {
        actionButtonBorder: "var(--actionButtonBorder)",
        quickReplyBorderRadius: "var(--quickReplyBorderRadius)",
      },
      boxShadow: {
        categoryBackDrop: "var(--categoryBackDrop)",
      },
    },
  },
  plugins: [],
};
