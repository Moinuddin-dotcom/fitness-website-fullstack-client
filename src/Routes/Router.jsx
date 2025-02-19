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
import TrainerRoute from "./TrainerRoute";
import AddNewClass from "../Components/Pages/DashboardPages/Admin/AdminRoutePages/AddNewClass";
import AllClasses from "../Components/Pages/Class/AllClasses";
import AddNewSlots from "../Components/Pages/DashboardPages/RealTrainerRoutes/RealTrainerRoutesPages/AddNewSlots";
import PaymentPage from "../Components/Pages/Trainer/TrainerBookedPage/Payment/PaymentPage";
import BookedTrainer from "../Components/Pages/DashboardPages/MemberRoutes/BookedTrainer";
import ProfilePage from "../Components/Pages/DashboardPages/MemberRoutes/MyProfile/ProfilePage";
import NewsletterSubscribers from "../Components/Pages/DashboardPages/Admin/AdminRoutePages/NewsletterSubscribers";
import AdminBalance from "../Components/Pages/DashboardPages/Admin/AdminRoutePages/AdminBalance";
import AddForum from "../Components/Pages/DashboardPages/Admin/AdminRoutePages/AddForum";
import MemberRoute from "../Components/Pages/DashboardPages/MemberRoutes/MemberRoute";
import AdminOrTrainer from "./AdminOrTrainer";
import Community from "../Components/HomeLayouts/Community";
import BlogDetails from "../Components/HomeLayouts/CommunityRoutes/BlogDetails";
import HomeCommunity from "../Components/HomeLayouts/HomeCommunity";
import NewDash from "../Components/Dashboard/NewDash";

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
                path: "/all-classes",
                element: <AllClasses />
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
                path: "/trainerBookedPage/:id/:exp",
                element:
                    <PrivateRoute>
                        <TrainerBookedPage />
                    </PrivateRoute>
            },
            {
                path: "/paymentPage",
                element:
                    <PrivateRoute>
                        <PaymentPage />
                    </PrivateRoute>
            },
            
            {
                path: "/home-community",
                element:
                    <PrivateRoute>
                        <HomeCommunity />
                    </PrivateRoute>
            },
            {
                path: "/blogDetails/:id",
                element:
                    <PrivateRoute>
                        <BlogDetails />
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
        path: "/community",
        element:
            <PrivateRoute>
                <Community />
            </PrivateRoute>
    },
    {
        path: "dashboard",
        element:
            <PrivateRoute>
                {/* <Dashboard />, */}
                <NewDash />,
            </PrivateRoute>,
        children: [
            // Member routes
            {
                path: "member-activity",
                element:
                    <PrivateRoute>
                        <ActivityLog />
                    </PrivateRoute>
            },
            {
                path: "booked-trainer",
                element:
                    <PrivateRoute>
                        <BookedTrainer />
                    </PrivateRoute>
            },
            {
                path: "profile-page",
                element:
                    <PrivateRoute>
                        <ProfilePage />,
                    </PrivateRoute>
            },
            // Trainers routes
            {
                path: "manage-slots",
                element:
                    <PrivateRoute>
                        <TrainerRoute>
                            <ManageSlots />
                        </TrainerRoute>
                    </PrivateRoute>
            },
            {
                path: "add-new-slots",
                element:
                    <PrivateRoute>
                        <TrainerRoute>
                            <AddNewSlots />
                        </TrainerRoute>
                    </PrivateRoute>
            },
            // {
            //     path: "add-forum",
            //     element:
            //         <PrivateRoute>
            //             <TrainerRoute>
            //                 <AddForum />
            //             </TrainerRoute>
            //         </PrivateRoute>
            // },
            // Admin routes
            {
                path: "admin-balance",
                element:
                    <PrivateRoute>
                        <AdminRoute>
                            <AdminBalance />
                        </AdminRoute>
                    </PrivateRoute>
            },
            {
                path: "newsletter-subscribers",
                element:
                    <PrivateRoute>
                        <AdminRoute>
                            <NewsletterSubscribers />
                        </AdminRoute>
                    </PrivateRoute>
            },
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
                path: "add-new-class",
                element:
                    <PrivateRoute>
                        <AdminRoute>
                            <AddNewClass />
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
            {
                path: "add-forum",
                element:
                    <PrivateRoute>
                        <AdminOrTrainer>
                            <AddForum />
                        </AdminOrTrainer>
                    </PrivateRoute>
            },
        ]
    }
])