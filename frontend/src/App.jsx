import { Outlet } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { NotificationProvider } from "./context/NotificationContext";
import HeaderNav from "./components/HeaderNav";
import Footer from "./components/Footer";
import "./App.css";
import "./style/global.css";
import "./style/variables.css";

function App() {
  return (
    <UserProvider>
      <NotificationProvider>
        <div className="mainContent">
          <HeaderNav />
          <Outlet />
          <Footer />
        </div>
      </NotificationProvider>
    </UserProvider>
  );
}

export default App;
