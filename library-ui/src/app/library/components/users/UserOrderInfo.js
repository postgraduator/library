import {Fragment} from "react";
import AdminOrderInfoTable from "../tables/order-info-table/AdminOrderInfoTable";
import UserCard from "./UserCard";

const UserOrderInfo = () => (<Fragment>
    <UserCard/>
    <AdminOrderInfoTable/>
</Fragment>);

export default UserOrderInfo;