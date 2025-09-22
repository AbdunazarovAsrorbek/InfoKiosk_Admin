import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";
import OverallReducer from "./overallStatistics/reducer";
import AdminReducer from "./admin/reducer";
import FacultyReducer from "./faculty/reducer";
import DepartmentReducer from "./department/reducer";
import UsersrateReducer from "./usersRate/reducer";
import ApplicationReducer from "./application/reducer";

const rootReducer = combineReducers({
    Layout: LayoutReducer,
    Login: LoginReducer,
    Overall: OverallReducer,
    Admin: AdminReducer,
    Faculty: FacultyReducer,
    Department: DepartmentReducer,
    UsersRate: UsersrateReducer,
    Application: ApplicationReducer,
});

export default rootReducer;

