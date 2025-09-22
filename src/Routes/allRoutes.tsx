import { Navigate } from "react-router-dom";

import Fourzerofour from "pages/AuthenticationInner/Errors/404Error";
import Fivezerozero from "pages/AuthenticationInner/Errors/500Error";
import Fivezerothree from "pages/AuthenticationInner/Errors/503Error";
import OfflinePage from "pages/AuthenticationInner/Errors/Offline";
import Crm from "pages/Dashboard/Crm";

// Authentication
import Login from "pages/Authentication/Login";
import Logout from "pages/Authentication/Logout";
import UserProfile from "pages/Authentication/user-profile";

// Pages
import DiscountBanner from "../pages/Pages/DiscountBanner/DiscountBanner";
import FooterSettings from "../pages/Pages/Footer/FooterSettings";
import ProfileSettings from "../pages/Pages/ProfileSettings/ProfileSettings";
import UserStatistik from "pages/UsersRate/UsersRate";
import StatisticsPage from "pages/StatisticsPage/StatisticsPage";
import Faculty from "pages/Faculty/Faculty";
import Department from "pages/Department/Department";
import Application from "pages/Application/Application";
import CreateDepartment from "pages/Department/CreateDepartment";
import CreateAdmins from "pages/Authentication/createAdmins";







const authProtectedRoutes = [
    // Dashboard
    { path: "/dashboard", component: <Crm /> },
    { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
    { path: "*", component: <Navigate to="/dashboard" /> },
    { path: "/dashboard", name: "Crm Dashboard", component: <Crm /> },
    { path: "/statisticsPage", name: "StatisticsPage", component: <StatisticsPage /> },

    // Page
    { path: "/userStatistik", name: "Users statistik", component: <UserStatistik /> },
    { path: "/faculty", name: "Faculty", component: <Faculty /> },
    { path: "/department", name: "Department", component: <Department /> },
    { path: "/createDepartment", name: "Create department", component: <CreateDepartment /> },
    { path: "/createDepartment/:id", name: "Edit department", component: <CreateDepartment /> },
    { path: "/application", name: "Application", component: <Application /> },


    //user prpfile
    { path: "/user-profile", name: "UserProfile", component: <UserProfile /> },
    { path: "/createAdmins", name: "CreateAdmins", component: <CreateAdmins /> },
    { path: "/", exact: true, name: "Navigate", component: <Navigate to="/dashboard" /> },


    //Pages
    { path: "/discount-banner", name: "DiscountBanner", component: <DiscountBanner /> },
    { path: "/footer-settings", name: "FooterSettings", component: <FooterSettings /> },
    { path: "/profile-settings", name: "ProfileSettings", component: <ProfileSettings /> },
];

const publicRoutes = [
    // Authentication
    { path: "/login", name: "Login", component: <Login /> },
    { path: "/logout", name: "Logout", component: <Logout /> },

    // Authentication Inner

    { path: "/auth-404", name: "Fourzerofour", component: <Fourzerofour /> },

    // Error 500
    { path: "/auth-500", name: "Fivezerozero", component: <Fivezerozero /> },

    // Error 503
    { path: "/auth-503", name: "Fivezerothree", component: <Fivezerothree /> },

    // Offline Page
    { path: "/auth-offline", name: "OfflinePage", component: <OfflinePage /> },

];

export { authProtectedRoutes, publicRoutes };