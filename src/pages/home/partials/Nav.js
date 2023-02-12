import React from "react";
import { useNavigate } from "react-router-dom";
import useTransitionnavBar from "./hooks/useTransitionnavBar";
import "../styles/Nav.css";

export default function Nav() {
  const { show } = useTransitionnavBar();
  const navigate = useNavigate();

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img
          className="nav__logo"
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="logo"
          onClick={() => navigate('/')}
        />
        <img
          className="nav__avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="profile"
          onClick={() => navigate("/profile")}
        />
      </div>
    </div>
  );
}
