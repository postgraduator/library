import PropTypes from "prop-types";
import {Fragment} from "react";
import {NavLink} from "react-router-dom";
import ROUTER_LINK from "../constants/router-constants";

const LoginForm = (props, {csrf, actionUrl, getErrorMessage}) => {
    const error = getErrorMessage();
    return (<Fragment>
        {error && <div className="alert alert-danger">{error}</div>}
        <form action={actionUrl} method="post">
            <legend>Library Login form</legend>
            <input type="hidden" name={csrf.parameterName} value={csrf.token}/>
            <div className="form-group">
                <label htmlFor="username">User name</label>
                <input className="form-control" id="username" type="text" name="username"
                       placeholder="Enter user name"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Passowrd</label>
                <input className="form-control" id="password" type="password" name="password"
                       placeholder="Enter password"/>
            </div>
            <button className="btn btn-primary" type="submit">Sign In</button>
        </form>
        <NavLink className="float-right" to={ROUTER_LINK.registration}>
            <small>Go to Registration Form></small>
        </NavLink>
    </Fragment>)
};

LoginForm.contextTypes = {
    csrf: PropTypes.object,
    actionUrl: PropTypes.string,
    getErrorMessage: PropTypes.func
};

export default LoginForm;