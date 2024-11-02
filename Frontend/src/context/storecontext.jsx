/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "https://food-delivery-topaz-two.vercel.app";
  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);

  // add to cart....
  const addTOCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      try {
        await axios.post(url + "/cart/add", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };

  //  remove from cart .....
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    try {
      if (token) {
        await axios.post(
          url + "/cart/remove",
          { itemId },
          { headers: { token } }
        );
      }
    } catch (error) {
      console.error("error while removing item", error);
    }
  };

  // ...
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/food/list");
      setFood_list(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.get(url + "/cart/get", {
        headers: { token },
      });

      // Ensure the correct structure of response data
      // console.log("Cart data:", response.data.data); //Adjust if needed
      setCartItems(response.data.data); // Adjust if needed
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    async function loadData() {
      try {
        console.log("Loading token:", localStorage.getItem("token"));
        await fetchFoodList();
        const token = localStorage.getItem("token");
        if (token) {
          setToken(token);
          await loadCartData(token);
        }
      } catch (error) {
        console.error("Error while fetching:", error);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addTOCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
