import { StoreContext } from "../../context/storecontext";
import { useContext } from "react";
import "./cart.css";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  // delivery fee logic of 2%
  const percentage = (getTotalCartAmount() * 6) / 100;
  const total = getTotalCartAmount() + percentage;
  const Navigate = useNavigate();
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
      </div>
      <br />
      <hr />
      {food_list.map((item, index) => {
        if (cartItems[item._id] > 0) {
          return (
            <div key={index}>
              <div className="cart-items-title cart-items-item">
                <img src={url + "/images/" + item.image} alt="" />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price * cartItems[item._id]}</p>
                <p
                  onClick={() => {
                    removeFromCart(item._id);
                  }}
                  className="cross"
                >
                  x
                </p>
              </div>
              <hr />
            </div>
          );
        }
      })}
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtototal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery fee</p>
            <p>{6}%</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${total}</b>
          </div>
          <button onClick={() => Navigate("/order")}>
            Procced To Checkout
          </button>
        </div>
        {/* promocode.. */}
        <div className="promocode">
          <div>
            <p>if you have promocode, Enter it here.</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo-code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
