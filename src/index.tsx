import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "../node_modules/@polynomialai/alpha-react/dist/style.css";
import "../node_modules/@polynomialai/alpha-react/dist/styles.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

localStorage.setItem(
  "accessToken",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGJlM2MwYWQxYWJiMzQzYzI5MjYxMzYiLCJhcHBUeXBlIjoiU3VwZXIgQWRtaW4iLCJyb2xlSWQiOiI2MzIwNzdiZGNmZmQ3YzIxZWJlN2M4ZjAiLCJzZXNzaW9uSWQiOiJhbHBoYW51bWVyaWMiLCJ1c2VyTmFtZSI6Ikd1ZXN0IHVzZXIgIiwiaWF0IjoxNjkyNjk2NTcxLCJleHAiOjE3MjQyMzI1NzF9.O72ZRE7Aop33DgbXTyNjuEUsPf0nii6oxz7bc1mQr08"
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
