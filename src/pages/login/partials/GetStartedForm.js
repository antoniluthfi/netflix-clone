import React from "react";
import "../styles/GettingStartedForm.css";

export default function GetStartedForm({ onClick }) {
  return (
    <form>
      <div className="gettingStarted">
        <input type="email" placeholder="Email Address" />
        <button
          type="button"
          className="gettingStarted__button"
          onClick={onClick}
        >
          GET STARTED
        </button>
      </div>
    </form>
  );
}
