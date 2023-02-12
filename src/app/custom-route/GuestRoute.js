import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { userState } from "../../features/user/userSlice";

export default function GuestRoute({ element }) {
  const user = useSelector(userState);

  if (!user) {
    return <Suspense fallback="Loading...">{element}</Suspense>;
  }

  return <Navigate to="/" replace />;
}
