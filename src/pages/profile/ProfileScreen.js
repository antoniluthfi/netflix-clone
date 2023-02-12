import React from "react";
import { useSelector } from "react-redux";
import { userState } from "../../features/user/userSlice";
import { auth } from "../../firebase";
import Nav from "../home/partials/Nav";
import Plans from "./partials/Plans";
import "./styles/ProfileScreen.css";

export default function ProfileScreen() {
  const user = useSelector(userState);

  return (
    <div className="profileScreen">
      <Nav />

      <div className="profileScreen__body">
        <h1>Edit Profile</h1>

        <div className="profileScreen__info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="profile"
          />

          <div className="profileScreen__details">
            <h2>{user?.email}</h2>
            <div className="profileScreen__plans">
              <h3>Plans (Current Plan: Premium)</h3>

              <Plans />
              <button
                className="profileScreen__signOut"
                onClick={() => auth.signOut()}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
