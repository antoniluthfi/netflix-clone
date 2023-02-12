import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { userState } from "../../../features/user/userSlice";
import db from "../../../firebase";
import "../styles/Plans.css";
import usePlanInitialDataFetching from "./hooks/usePlanInitialDataFetching";

export default function Plans() {
  const user = useSelector(userState);
  const { products, subscription } = usePlanInitialDataFetching();

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51MaEMTJp4KckGaqYJg0YdqbvObO7WkyXzWcCABwqYpsiTHCq8CB4INABI28KqzWlDgMpmq9YnO4l3CDHuBneZDjK00zPfXW4j4"
        );

        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="plans">
      {subscription && (
        <p>
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        // TODO: add some logic to check if the user's subscription is active
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          ?.includes(subscription?.role);

        return (
          <div
            key={productId}
            className={`plans__plan ${
              isCurrentPackage && "plans__plan--disabled"
            }`}
          >
            <div className="plans__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>

            <button
              onClick={() => {
                if (!isCurrentPackage) {
                  loadCheckout(productData?.prices?.priceId);
                }
              }}
            >
              {isCurrentPackage ? "Current Package" : "Subscibe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
