import React, { useEffect } from "react";
import "./App.css";
import Routing from "./routes/Routing";
import { useAppSelector } from "./app/hooks";

function App() {
  const color = useAppSelector((state) => state.root.color);
  useEffect(() => {
    document.documentElement.style.setProperty("--primary", color.primary);
    document.documentElement.style.setProperty("--secondary", color.secondary);
    document.documentElement.style.setProperty(
      "--background",
      color.background
    );
    document.documentElement.style.setProperty("--error", color.error);
  }, []);
  return <Routing />;
}

export default App;
