import { useState } from "react";
import Explore_menu from "../../components/Explore Menu/Explore_menu";
import Header from "../../components/Header/Header";
import "./home.css";
import Food_display from "../../components/Food Display/Food_display";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <Explore_menu category={category} setCategory={setCategory} />
      <Food_display category={category} />
    </div>
  );
};

export default Home;
