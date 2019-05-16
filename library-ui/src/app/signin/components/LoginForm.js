import {Fragment} from "react";
import {NavLink} from "react-router-dom";
import ROUTER_LINK from "../constants/router-constants";

const LoginForm = () => (<Fragment>
    <div>Login form</div>
    <NavLink to={ROUTER_LINK.registration}>Go to Registration Form</NavLink>
</Fragment>);

export default LoginForm;