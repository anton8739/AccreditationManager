import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import Roles from "pages/Roles/Roles";
import Tournaments from "pages/ Tournaments/Tournaments";
import AccessForManagers from "pages/AccessForManagers/AccessForManagers";
import Accreditation from "pages/Accreditation/Accreditation";
import SingleTournament from "pages/SingleTournament/SingleTournament";
import SingleAccreditation from "pages/SingleAccreditation/SingleAccreditation";

export const RouteNames =  {
    LOGIN : '/login',
    ROLES : '/roles',
    HOME : '/',
    TOURNAMENTS : '/tournaments',
    SINGLE_TOURNAMENT : '/tournament',
    ACCESS_CONTROL : '/accessControl',
    ACCESS_FOR_MANAGERS : '/accessForManagers',
    ACCREDITATION : '/accreditation',
    EDIT_ACCREDITATION : '/accreditation/edit'
}
export const publicRoutes = [
    {path: RouteNames.LOGIN, exact: true, element: Login},
]

export const managerRoutes = [
    {path: RouteNames.HOME, exact: true, element: Home},
    {path: RouteNames.ACCREDITATION, exact: true, element: Accreditation},
    {path: `${RouteNames.EDIT_ACCREDITATION}/:id`,  element: SingleAccreditation}
]
export const adminRoutes = [
    {path: RouteNames.HOME, exact: true, element: Home},
    {path: RouteNames.ROLES, exact: true, element: Roles},
    {path: RouteNames.TOURNAMENTS, exact: true, element: Tournaments},
    {path: RouteNames.ACCESS_FOR_MANAGERS, exact: true, element: AccessForManagers},
    {path: RouteNames.ACCREDITATION, exact: true, element: Accreditation},
    {path: `${RouteNames.SINGLE_TOURNAMENT}/:id`,  element: SingleTournament},
    {path: `${RouteNames.EDIT_ACCREDITATION}/:id`,  element: SingleAccreditation}
]