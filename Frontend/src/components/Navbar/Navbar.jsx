/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { assets } from "../../assets/food del assets/frontend_assets/assets";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/storecontext";
import { toast } from "react-toastify";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logout successfully!");
    navigate("/");
  };
  return (
    <div className="navbar">
      <NavLink to={"/"}>
        <img src={assets.logo} alt="logo" className="Logo" />
      </NavLink>

      <ul className="navbar-menu">
        <NavLink
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </NavLink>
        <a
          href="#ExploreMenu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact us")}
          className={menu === "contact us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>

      <div className="nav-right">
        <img src={assets.search_icon} alt="" />
        <div className="search-icon">
          <NavLink to={"/cart"}>
            <img src={assets.basket_icon} alt="" />
          </NavLink>

          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button
            onClick={() => {
              setShowLogin(true);
            }}
          >
            sign in
          </button>
        ) : (
          <div className="nav-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={onLogout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
