import { createBrowserRouter } from "react-router-dom";
import Main from "../MainLayout/Main";
import Home from "../Layouts/Home";
import ErrorPage from "../Components/Pages/ErrorPage/ErrorPage";
import Trainer from "../Components/Pages/Trainer/Trainer";
import Register from "../Components/Pages/LogInAndRegister/Register";
import Login from "../Components/Pages/LogInAndRegister/Login";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/trainer",
                element: <Trainer />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            }
        ]
    }
])