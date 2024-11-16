import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function NavBar() {
  const { user, logoutfunc } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

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
          onClick={toggleSidebar}
          className="lg:hidden h-11 text-center px-4 mr-[0.1rem] bg-gray-700 text-slate-600 border border-white rounded-md bg-white text-[2rem]"
        >
          ☰
          
        </button>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-xl"
        >
          ✕
        </button>
        <div className="flex flex-col items-start p-4">
          {user ? (
            <>
              <p className="mb-4 text-yellow-500">Logged in as {user.name}</p>
              <button
                onClick={logoutfunc}
                className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
