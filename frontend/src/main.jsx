import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import AdvertDetail from "./pages/AdvertDetail";
import Catalog from "./pages/Catalog";
import Explore from "./pages/Explore";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import MangaDetails from "./pages/MangaDetails";
import NewAdvert from "./pages/NewAdvert";
import NotFound from "./pages/NotFound";
import PaymentPage from "./pages/Payment";
import ProfilUser from "./pages/ProfilUser";
import RequireAuth from "./context/RequireAuth";
import UpdateProfile from "./pages/UpdateProfile";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/advert/:id",
        element: <AdvertDetail />,
      },
      {
        path: "/catalog",
        element: <Catalog />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/manga/:id",
        element: <MangaDetails />,
      },
      {
        path: "/new-advert",
        element: (
          <RequireAuth>
            <NewAdvert />
          </RequireAuth>
        ),
      },
      {
        path: "/payment/:id",
        element: (
          <RequireAuth>
            <PaymentPage />
          </RequireAuth>
        ),
      },
      {
        path: "/profile/:id",
        element: (
          <RequireAuth>
            <ProfilUser />
          </RequireAuth>
        ),
      },
      {
        path: "/update-profile/:id",
        element: (
          <RequireAuth>
            <UpdateProfile />
          </RequireAuth>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/404",
        element: <NotFound />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
