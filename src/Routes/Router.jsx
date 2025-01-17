import { createBrowserRouter } from "react-router-dom";
import Main from "../MainLayout/Main";
import Home from "../Layouts/Home";
import ErrorPage from "../Components/Pages/ErrorPage/ErrorPage";
import Trainer from "../Components/Pages/Trainer/Trainer";
import Register from "../Components/Pages/LogInAndRegister/Register";
import Login from "../Components/Pages/LogInAndRegister/Login";
import Dashboard from "../Components/Dashboard/Dashboard";
import ActivityLog from "../Components/Pages/DashboardPages/ActivityLog";
import TrainerDetails from "../Components/Pages/Trainer/TrainerDetails";
import TrainerBooking from "../Components/Pages/Trainer/TrainerBooking";
import BeATrainerForm from "../Components/Pages/Trainer/BeATrainerForm";

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
                path: "/trainerDetails/:id",
                element: <TrainerDetails />,
                loader: async ({ params }) => {
                    const response = await fetch("/public/trainer.json");
                    const trainers = await response.json();
                    return trainers.find(trainer => trainer.id === parseInt(params.id));
                }
            },
            {
                path: "/trainerBooking",
                element: <TrainerBooking />
            },
            {
                path: "/beAtrainerform",
                element: <BeATrainerForm />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },

        ]
    },
    {
        path: "dashboard",
        element: <Dashboard />,
        children: [
            {
                path: "member-activity",
                element: <ActivityLog />

            }
        ]
    }
])