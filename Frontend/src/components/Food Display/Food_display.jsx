/* eslint-disable react/prop-types */
import { useContext } from "react";
import "./Food_display.css";
import { StoreContext } from "../../context/storecontext";
import Fooditem from "../foodItem/Fooditem";
const Food_display = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  // if (food_list) {
  //   console.log(food_list);
  // }
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <Fooditem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Food_display;
