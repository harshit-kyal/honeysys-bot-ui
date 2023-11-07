import toast from "react-hot-toast";

export const ToastPopup = ({ text = "" }: { text: string }) => {
  toast(text, {
    style: {
      padding: " 16px 10px",
      borderRadius: "8px",
      background: "#0a4310",
      color: "#FFF",
    },
  });
};
