/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./Order.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/admin_assets/assets";

const Order = ({ url }) => {
  const [order, setOrder] = useState([]);
  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/order/list");
    if (response.data.success) {
      setOrder(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error");
    }
  };
  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/order/status", {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, [url]);
  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {order.map((order, index) => (
          <div key={index} className="order-item">
            <div className="order-item-left">
              <img src={assets.parcel_icon} alt="" />
            </div>
            <div className="order-item-address">
              <p className="order-item-name">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p className="order-item-phone">{order.address.phone}</p>
              <p>{order.address.street},</p>
              <p>
                {order.address.city}, {order.address.state},{" "}
                {order.address.zipcode}
              </p>
            </div>
            <div className="order-item-middle">
              <div className="order-item-details">
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + "X" + item.quantity;
                    } else {
                      return item.name + "X" + item.quantity + ",";
                    }
                  })}
                </p>
                <p className="order-item-count">Items: {order.items.length}</p>
                <p className="order-item-amount">${order.amount}</p>
              </div>
            </div>
            <div className="order-item-right">
              <select
                value={order.status}
                onChange={(event) => statusHandler(event, order._id)}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
