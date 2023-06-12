import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Error from "./pages/Error/Error";
import Sidebar from "./components/Sidebar/Sidebar";
import ProfileSetup from "./pages/ProfileSetup/ProfileSetup";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import Services from "./pages/Services/Services";
import Users from "./pages/Users/Users";
import Landing from "./pages/Landing/Landing";
import Hiring from "./pages/Hiring/Hiring";
import UserHirings from "./pages/UserHirings.jsx/UserHirings";
import HiringConfirm from "./pages/HiringConfirm/HiringConfirm";
import { useSelector } from "react-redux";
import Loading from "./components/Loading/Loading";

const Login = React.lazy(() => import("./pages/Login/Login"));
const Signup = React.lazy(() => import("./pages/Signup/Signup"));
const Profile = React.lazy(() => import("./pages/Profile/Profile"));
const Jobs = React.lazy(() => import("./pages/Jobs/Jobs"));

function App() {
  const { user } = useSelector((store) => store.auth);
  const { isOpen } = useSelector((store) => store.sidebar);

  return (
    <div className="relative">
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <SharedLayout />
            </ProtectedRoutes>
          }>
          <Route index element={<Services />} />
          <Route path="users" element={<Users />} />
          <Route path="complains" element={<h1>Complains</h1>} />
        </Route>
        <Route path="/home" element={<Home />} />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <React.Suspense fallback={<Loading />}>
                <Login />
              </React.Suspense>
            )
          }
        />
        <Route
          path="/signup"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <React.Suspense fallback={<Loading />}>
                <Signup />
              </React.Suspense>
            )
          }
        />
        <Route
          path="/profile"
          element={
            !user ? (
              <Navigate to="/" />
            ) : (
              <React.Suspense>
                <Profile />
              </React.Suspense>
            )
          }
        />
        <Route
          path="/service-profile"
          element={!user ? <Navigate to="/" /> : <ProfileSetup />}
        />
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Landing />} />
        <Route
          path="/hiring/:serviceProviderId"
          element={!user ? <Navigate to={"/login"} /> : <Hiring />}
        />
        <Route
          path="/hiring/user"
          element={
            !user ? (
              <Navigate to={"/login"} />
            ) : (
              <React.Suspense>
                <UserHirings />
              </React.Suspense>
            )
          }
        />
        <Route
          path="/hiring/user/jobs"
          element={
            !user ? (
              <Navigate to={"/login"} />
            ) : (
              <React.Suspense>
                <Jobs />
              </React.Suspense>
            )
          }
        />
        <Route
          path="/hiring/confirm/:serviceManUserId"
          element={
            !user ? (
              <Navigate to={"/login"} />
            ) : (
              <React.Suspense>
                <HiringConfirm />
              </React.Suspense>
            )
          }
        />
      </Routes>
      {isOpen && <Sidebar />}
    </div>
  );
}

export default App;
