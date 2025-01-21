import { createBrowserRouter } from "react-router-dom";
import Main from "../MainLayout/Main";
import Home from "../Layouts/Home";
import ErrorPage from "../Components/Pages/ErrorPage/ErrorPage";
import Trainer from "../Components/Pages/Trainer/Trainer";
import Register from "../Components/Pages/LogInAndRegister/Register";
import Login from "../Components/Pages/LogInAndRegister/Login";
import Dashboard from "../Components/Dashboard/Dashboard";
import TrainerDetails from "../Components/Pages/Trainer/TrainerDetails";
import TrainerBooking from "../Components/Pages/Trainer/TrainerBooking";
import BeATrainerForm from "../Components/Pages/Trainer/BeATrainerForm";
import AppliedTrainer from "../Components/Pages/DashboardPages/TrainerRoutes/AppliedTrainer";
import AppliedTrainerDetails from "../Components/Pages/DashboardPages/TrainerRoutes/Pages/AppliedTrainerDetails";
import ActivityLog from "../Components/Pages/DashboardPages/MemberRoutes/ActivityLog";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ManageSlots from "../Components/Pages/DashboardPages/RealTrainerRoutes/RealTrainerRoutesPages/ManageSlots";
import AllTrainers from "../Components/Pages/DashboardPages/Admin/AdminRoutePages/AllTrainers";
import TrainerBookedPage from "../Components/Pages/Trainer/TrainerBookedPage/TrainerBookedPage";

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
            },
            {
                path: "/trainerBooking",
                element:
                    <PrivateRoute>
                        <TrainerBooking />
                    </PrivateRoute>
            },
            {
                path: "/beAtrainerform",
                element:
                    <PrivateRoute>
                        <BeATrainerForm />
                    </PrivateRoute>
            },
            {
                path: "/trainerBookedPage",
                element:
                    <PrivateRoute>
                        <TrainerBookedPage />
                    </PrivateRoute>
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
            // Member routes
            {
                path: "member-activity",
                element: <ActivityLog />
            },
            // Trainers routes
            {
                path: "manage-slots",
                element: <ManageSlots />
            },
            // Admin routes
            {
                path: "all-trainers",
                element:
                    <PrivateRoute>
                        <AdminRoute>
                            <AllTrainers />
                        </AdminRoute>
                    </PrivateRoute>
            },
            {
                path: "applied-trainer",
                element:
                    <PrivateRoute>
                        <AdminRoute>
                            <AppliedTrainer />
                        </AdminRoute>
                    </PrivateRoute>
            },
            {
                path: "applied-trainer-details/:id",
                element:
                    <PrivateRoute>
                        <AdminRoute>
                            <AppliedTrainerDetails />
                        </AdminRoute>
                    </PrivateRoute>
            },
        ]
    }
])