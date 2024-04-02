import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import MangaDetails from "./pages/MangaDetails";
import Explore from "./pages/Explore";
import NewAdvert from "./pages/NewAdvert";
import UpdateAdvert from "./pages/UpdateAdvert";
import Home from "./pages/Home";
import PaymentPage from "./pages/PaymentPage";
import AnnouncementDetail from "./pages/AnnouncementDetails";
import ProfilUser from "./pages/ProfilUser";
import NotFoundPage from "./pages/NotFoundPage";
import Favorites from "./pages/Favorites";
import Catalog from "./pages/Catalog";
import MyAnounces from "./pages/MyAnounces";
import RequireAuth from "./context/RequireAuth";
import ProfilSeller from "./pages/ProfilSeller";
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
        path: "/manga/catalog",
        element: <Catalog />,
      },
      {
        path: "manga/:id",
        element: <MangaDetails />,
      },
      {
        path: "/paymentPage/:id",
        element: (
          <RequireAuth>
            <PaymentPage />
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
        path: "/display-adverts/:id",
        element: <AnnouncementDetail />,
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
        path: "/profilUser/:id",
        element: (
          <RequireAuth>
            {" "}
            <ProfilUser />{" "}
          </RequireAuth>
        ),
      },
      {
        path: "/profilseller/:id",
        element: <ProfilSeller />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: "/404",
        element: <NotFoundPage />,
      },
      {
        path: "/myAnounces/:id",
        element: (
          <RequireAuth>
            <MyAnounces />
          </RequireAuth>
        ),
      },
      {
        path: "/update-advert/:id",
        element: (
          <RequireAuth>
            <UpdateAdvert />
          </RequireAuth>
        ),
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
