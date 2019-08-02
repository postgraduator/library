import BookEditorList from "../components/BookEditorList";
import Books from "../components/Books";
import Orders from "../components/Orders";
import Profile from "../components/Profile";
import UserOrderInfo from "../components/users/UserOrderInfo";
import UserPage from "../components/users/UserPage";
import Users from "../components/users/Users";
import {PERMISSIONS} from "./security";
import {STATES} from "./states";

const ROOT_PATH = STATES.main;

const ROUTE_LIST = [{
    path: ROOT_PATH,
    name: 'Main',
    exact: true,
    component: Books,
    permissions: [PERMISSIONS.visitor]
}, {
    path: STATES.profile,
    name: 'Profile',
    component: Profile
}, {
    path: STATES.orders,
    name: 'Orders',
    component: Orders,
    permissions: [PERMISSIONS.visitor]
}, {
    path: STATES.users,
    name: 'Users',
    component: UserPage,
    permissions: [PERMISSIONS.administrator],
    children: [{
        path: STATES.users,
        exact: true,
        component: Users,
        permissions: [PERMISSIONS.administrator]
    }, {
        path: STATES.adminUserOrderInfo,
        component: () => (<UserOrderInfo/>),
        permissions: [PERMISSIONS.administrator]
    }]
}, {
    path: STATES.bookEditor,
    name: 'Books',
    component: BookEditorList,
    permissions: [PERMISSIONS.administrator]
}];

export {ROUTE_LIST, ROOT_PATH};