import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <nav className="flex justify-between bg-nav-dark-gray p-4">
        <h1 className="xl:ml-[100px] text-2xl">ChattApp</h1>
        <span className="text-xl text-yellow-500">
          logged in as Sahil Chettiar
        </span>
        <div className="flex gap-4 xl:mr-[100px] text-2xl hidden lg:flex">
          <button>Login</button>
          <button>Register</button>
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
