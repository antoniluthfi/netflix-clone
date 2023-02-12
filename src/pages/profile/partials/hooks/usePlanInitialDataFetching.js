import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userState } from "../../../../features/user/userSlice";
import db from "../../../../firebase";

export default function usePlanInitialDataFetching() {
  const user = useSelector(userState);
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const newProducts = [];

        querySnapshot.forEach(async (productDoc) => {
          newProducts[productDoc.id] = productDoc.data();

          const priceSnap = await productDoc.ref.collection("prices").get();

          priceSnap.docs.forEach((price) => {
            newProducts[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });

          setProducts(newProducts);
        });
      });
  }, []);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);

  return { products, subscription };
}
