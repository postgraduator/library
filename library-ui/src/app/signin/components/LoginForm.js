import PropTypes from "prop-types";
import {Fragment} from "react";
import {Link} from "react-router-dom";
import ROUTER_LINK from "../constants/router-constants";
import {ServerInfoContext} from "../context";

const LoginForm = ({csrf, actionUrl, errorMessage}) => {
    return (<Fragment>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
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
        <Link className="float-right" to={ROUTER_LINK.registration}>
            <small>Go to Registration Form></small>
        </Link>
    </Fragment>)
};

LoginForm.propTypes = {
    csrf: PropTypes.object.isRequired,
    actionUrl: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired
};

export default ({errorMessage}) => (<ServerInfoContext.Consumer>
    {({csrf, actionUrl}) => (<LoginForm csrf={csrf} actionUrl={actionUrl} errorMessage={errorMessage}/>)}
</ServerInfoContext.Consumer>);