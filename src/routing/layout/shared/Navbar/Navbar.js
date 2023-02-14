import { Link } from "react-router-dom";
import { FaUser, FaGripHorizontal } from "react-icons/fa";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { logout } from "../../../../features/auth/authSlice";
import auth from "../../../../firebase/firebase.config";

const Navbar = () => {
  const { email } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch(logout());
    });
  };

  const navItems = (
    <React.Fragment>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/dashboard"}>Dashboard</Link>
      </li>
    </React.Fragment>
  );
  const logInOut = email ? (
    <>
      <li title="User Image">
        <button
          onClick={handleSignOut}
          className="hover:text-secondary transition-all"
        >
          Log Out
        </button>
      </li>
    </>
  ) : (
    <>
      <li>
        <Link to={"/login"}>Login</Link>
      </li>
      <li>
        <Link to={"/registration"}>Registration</Link>
      </li>
      {/* <li title="User Image">
        <FaUser></FaUser>
      </li> */}
    </>
  );

  return (
    <div className="navbar bg-primary text-white py-3 px-2 sm:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={1}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow-xl bg-primary rounded-bo w-52"
          >
            {navItems}
          </ul>
        </div>
        <Link to={"/"} className=" normal-case font-semibold text-2xl">
          Project Name
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{navItems}</ul>
      </div>
      <div className="navbar-end ">
        <ul className="flex gap-2 sm:gap-6 items-center">{logInOut}</ul>
      </div>
      <label
        htmlFor="dashboard-drawer"
        tabIndex={2}
        className="btn btn-ghost ml-5 lg:hidden"
      >
        <FaGripHorizontal className="h-5 w-5"></FaGripHorizontal>
      </label>
    </div>
  );
};

export default Navbar;
