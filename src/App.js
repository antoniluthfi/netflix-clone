import React, { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./app/custom-route/ProtectedRoute";
import GuestRoute from "./app/custom-route/GuestRoute";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/user/userSlice";

const HomeScreen = lazy(() => import("./pages/home/HomeScreen"));
const LoginScreen = lazy(() => import("./pages/login/LoginScreen"));
const ProfileScreen = lazy(() => import("./pages/profile/ProfileScreen"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((res) => {
      if (res) {
        // authenticate
        dispatch(
          login({
            uid: res.uid,
            email: res.email,
          })
        );
      } else {
        // unauthenticate
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Suspense fallback="Loading...">
      <div className="app">
        <Router>
          <Routes>
            <Route
              path="/"
              element={<ProtectedRoute element={<HomeScreen />} />}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute element={<ProfileScreen />} />}
            />
            <Route
              path="/login"
              element={<GuestRoute element={<LoginScreen />} />}
            />
          </Routes>
        </Router>
      </div>
    </Suspense>
  );
}

export default App;
