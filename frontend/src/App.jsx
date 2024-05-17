import { Outlet } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import HeaderNav from "./components/HeaderNav";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";
import "./style/global.css";
import "./style/variables.css";

function App() {
  return (
    <UserProvider>
      <ScrollToTop />
      <div className="mainContent">
        <HeaderNav />
        <Outlet />
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
