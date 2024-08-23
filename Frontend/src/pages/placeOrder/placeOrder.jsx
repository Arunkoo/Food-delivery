import { useContext, useEffect, useState } from "react";
import "./placeOrder.css";
import { StoreContext } from "../../context/storecontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Placeorder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  //for storing data of user...
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // event handler function..
  const eventHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const PlaceOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    // Debugging: Check food_list and cartItems
    console.log("food_list:", food_list);
    console.log("cartItems:", cartItems);

    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item }; // Create a copy of the item object
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    // Debugging: Check orderItems
    console.log("orderItems:", orderItems);

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    // Debugging: Check orderData
    console.log("orderData:", orderData);

    try {
      let response = await axios.post(url + "/order/place", orderData, {
        headers: { token },
      });

      // Debugging: Check response
      console.log("response:", response);

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, getTotalCartAmount]);
  const percentage = (getTotalCartAmount() * 2) / 100;
  const total = getTotalCartAmount() + percentage;
  return (
    <form onSubmit={PlaceOrder} className="placeOrder">
      <div className="placeOrder-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={eventHandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            onChange={eventHandler}
            value={data.lastName}
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          name="email"
          onChange={eventHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={eventHandler}
          value={data.street}
          type="text"
          placeholder="street"
        />

        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={eventHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={eventHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={eventHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip code"
          />
          <input
            required
            name="country"
            onChange={eventHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={eventHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>
      <div className="placeOrder-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtototal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery fee</p>
            <p>{2}%</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${total}</b>
          </div>
          <button type="submit">Procced To Payment</button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
