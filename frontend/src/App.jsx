import { useState, useMemo } from "react";
import { Outlet } from "react-router-dom";

import UserContext from "./context/UserContext";
import { NotificationProvider } from "./context/NotificationContext";

// import LeftNavbar from "./components/LeftNavbar";
import HeaderNav from "./components/HeaderNav";
import Footer from "./components/Footer";
import { FiltersProvider } from "./context/FilterContext";
import "./App.css";
import "./style/global.css";
import "./style/variables.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getInitialAuthState = () => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        return authData.token && authData.user.id
          ? authData
          : { token: "", userId: "" };
      } catch (error) {
        console.error("Error parsing auth from localStorage", error);
        return { token: "", userId: "" };
      }
    }
    return { token: "", userId: "" };
  };
  const [auth, setAuth] = useState(getInitialAuthState);
  const userContextValue = useMemo(
    () => ({ auth, setAuth, isModalOpen, setIsModalOpen }),
    [auth, isModalOpen]
  );
  return (
    <FiltersProvider>
      <UserContext.Provider value={userContextValue}>
        <NotificationProvider>
          <div className="mainContainer">
            {/* <LeftNavbar /> */}
            <div className="mainContent">
              <HeaderNav />
              <Outlet />
              <Footer />
            </div>
          </div>
        </NotificationProvider>
      </UserContext.Provider>
    </FiltersProvider>
  );
}

export default App;
