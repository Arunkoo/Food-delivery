/* eslint-disable react/prop-types */
import { useContext } from "react";
import { assets } from "../../assets/food del assets/frontend_assets/assets";
import "./Fooditem.css";
import { StoreContext } from "../../context/storecontext";
const Fooditem = ({ id, name, price, description, image }) => {
  const { addTOCart, removeFromCart, cartItems, url } =
    useContext(StoreContext);
  return (
    <div className="food-item">
      <div className="food-item-container">
        <img
          src={url + "/images/" + image}
          className="food-item-image"
          alt=""
        />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addTOCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addTOCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default Fooditem;
