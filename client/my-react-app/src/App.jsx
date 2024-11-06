import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/chatContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="flex flex-col h-screen">
        <NavBar />
        <ChatContextProvider>
          <Routes>
            <Route path="/" element={user ? <Chat /> : <Login />} />
            <Route path="/register" element={user ? <Chat /> : <Register />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ChatContextProvider>
      </div>
    </>
  );
}

export default App;
