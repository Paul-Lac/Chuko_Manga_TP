import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import Admin from "./pages/Admin";
import AdminManga from "./components/AdminManga";
import MangaDetails from "./pages/MangaDetails";
import Explore from "./pages/Explore";
import NewAdvert from "./pages/NewAdvert";
import UpdateAdvert from "./pages/UpdateAdvert";
import Home from "./pages/Home";
import PaymentPage from "./pages/Payment";
import AdvertDetail from "./pages/AdvertDetail";
import ProfilUser from "./pages/ProfilUser";
import NotFound from "./pages/NotFound";
import Favorites from "./pages/Favorites";
import Catalog from "./pages/Catalog";
import AdvertSeller from "./pages/AdvertSeller";
import RequireAuth from "./context/RequireAuth";
// import ProfilSeller from "./pages/ProfilSeller";
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
        path: "/cma",
        element: <Admin />,
      },
      {
        path: "/cma/mangas",
        element: <AdminManga />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/explore/search/:searchQuery",
        element: <Explore />,
      },
      {
        path: "/explore/volume/:volumeId",
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
        path: "/advert-seller/:id",
        element: (
          <RequireAuth>
            <AdvertSeller />
          </RequireAuth>
        ),
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
      // {
      //   path: "/profilseller/:id",
      //   element: <ProfilSeller />,
      // },
      {
        path: "/update-advert/:id",
        element: (
          <RequireAuth>
            <UpdateAdvert />
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
