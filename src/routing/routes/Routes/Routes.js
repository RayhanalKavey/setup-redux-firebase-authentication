import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import ErrorPage from "../../layout/shared/ErrorPage/ErrorPage";
import Home from "../../../pages/home/Home/Home";
import Login from "../../../pages/authentication/Login/Login";
import Registration from "../../../pages/authentication/Registration/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/login", element: <Login></Login> },
      { path: "/registration", element: <Registration></Registration> },
    ],
  },
]);
export default router;
