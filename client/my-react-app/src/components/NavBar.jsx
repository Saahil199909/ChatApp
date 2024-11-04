import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function NavBar() {
  const { user, logoutfunc } = useContext(AuthContext);

  return (
    <div>
      <nav className="flex justify-between items-center bg-nav-dark-gray p-4">
        <h1 className="xl:ml-[100px] text-2xl">ChattApp</h1>
        <span className="md:hidden text-xl text-yellow-500">
          {/* {user.name} */}
        </span>
        {user ? (
          <span className="hidden md:flex text-xl text-yellow-500">
            Logged in as {user.name}
          </span>
        ) : (
          <p></p>
        )}
        <div className="flex gap-8 xl:mr-[100px] text-2xl hidden lg:flex">
          {user ? (
            <button>
              <i class="fa-duotone fa-solid fa-message"></i>{" "}
            </button>
          ) : (
            <Link to="/">
              <button>Login</button>
            </Link>
          )}

          {user ? (
            <button onClick={logoutfunc}>Logout</button>
          ) : (
            <Link to="/register">
              <button>Register</button>
            </Link>
          )}
        </div>
        <button
          // onClick={toggleAside}
          className="lg:hidden h-11 text-center px-4 mr-[0.1rem] bg-gray-700 text-slate-600 border border-white rounded-md bg-white text-[2rem]"
        >
          ☰
        </button>
      </nav>
    </div>
  );
}
