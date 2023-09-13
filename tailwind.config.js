/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // screens: {
      //   xs: { min: "360px" },
      // },
      fontSize: {
        // Cart
        cartTitleSize: "var(--cartTitleSize)",
        cartTitleSmallSize: "var(--cartTitleSmallSize)",
        cartQuantitySize: "var(--cartQuantitySize)",
        cartQuantitySmallSize: "var(--cartQuantitySmallSize)",
        cartPriceSize: "var(--cartPriceSize)",
        cartPriceSmallSize: "var(--cartPriceSmallSize)",
      },
      fontWeight: {
        // Cart
        cartQuantityWeight: "var(--cartQuantityWeight)",
        cartTitleWeight: "var(--cartTitleWeight)",
        cartPriceWeight: "var(--cartPriceWeight)",
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        background: "var(--background)",
        error: "#C25E5E",
        secondaryFontColor: "#505050",
        // Cart
        cartImgBorderColor: "var(--cartImgBorderColor)",
      },
      borderRadius: {
        default: "var(--radius)",
      },
      boxShadow: {
        default: "var(--shadow)",
      },
    },
  },
  plugins: [],
};
