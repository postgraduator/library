import PropTypes from "prop-types";
import {Fragment} from "react";
import {NavLink} from "react-router-dom";
import ROUTER_LINK from "../constants/router-constants";

const RegistrationForm = (props, {userRestService, getErrorMessage, removeErrorMessage}) => {
    getErrorMessage() && removeErrorMessage();
    return (<Fragment>
        <div>Registration Form</div>
        <NavLink className="float-right" to={ROUTER_LINK.root}>
            <small>Go to Login Form></small>
        </NavLink>
    </Fragment>)
};

RegistrationForm.contextTypes = {
    userRestService: PropTypes.object,
    getErrorMessage: PropTypes.func,
    removeErrorMessage: PropTypes.func
};

export default RegistrationForm;