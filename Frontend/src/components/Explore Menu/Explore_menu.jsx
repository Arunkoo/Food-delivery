/* eslint-disable react/prop-types */
import "./Explore_menu.css";
import { menu_list } from "../../assets/food del assets/frontend_assets/assets";
const Explore_menu = ({ category, setCategory }) => {
  return (
    <div className="ExploreMenu" id="ExploreMenu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Dive into our carefully curated menu, featuring a wide array of dishes
        crafted to delight every palate. Whether you're in the mood for a savory
        entrée, a fresh salad, or a sweet treat, we've got something to satisfy
        every craving
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              className="explore-menu-list-item"
              key={index}
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>

      <hr />
    </div>
  );
};

export default Explore_menu;
