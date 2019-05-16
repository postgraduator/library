import {Fragment} from "react";
import {NavLink} from "react-router-dom";
import ROUTER_LINK from "../constants/router-constants";

const RegistrationForm = () => (<Fragment>
    <div>Registration Form</div>
    <NavLink to={ROUTER_LINK.root}>Go to Login Form</NavLink>
</Fragment>);

export default RegistrationForm;