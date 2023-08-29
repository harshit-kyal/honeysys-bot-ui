import React, { useEffect } from "react";
import "./App.css";
import Routing from "./routes/Routing";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchBot, getChat, getConversationId } from "./services";
import { environment } from "./environments/environment";
import { setBotInfo, setBotType, setConvId } from "./slices/botSlice";
import { decrypt, encrypt } from "./services/aes";
import axios from "axios";
import { io } from "socket.io-client";

function App() {
  const dispatch = useAppDispatch();
  const convId = useAppSelector((state) => state.bot.convId);

  const color = useAppSelector((state) => state.root.color);
  const radius = useAppSelector((state) => state.root.radius);
  const Catalog = useAppSelector((state) => state.root.Catalog);

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
  }, []);
  return <Routing />;
}

export default App;
