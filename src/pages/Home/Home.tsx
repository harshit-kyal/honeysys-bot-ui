import React from "react";
import { useAppSelector } from "../../app/hooks";

const Home = () => {
  const color = useAppSelector((state) => state.root.color);
  return <div>Home</div>;
};

export default Home;
