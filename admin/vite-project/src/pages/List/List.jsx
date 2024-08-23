/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/food/list`);
      console.log(response.data.data);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error while fetching the food list.");
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
      toast.error("Network error while fetching the food list.");
    }
  };
  // remove food..
  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img
                className="image"
                src={`${url}/images/` + item.image}
                alt=""
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p
                className="cursor"
                onClick={() => {
                  removeFood(item._id);
                }}
              >
                x
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
