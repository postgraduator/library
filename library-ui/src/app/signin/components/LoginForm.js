import PropTypes from "prop-types";
import {Fragment} from "react";
import {Link} from "react-router-dom";
import ROUTER_LINK from "../constants/router-constants";
import {StateContext} from "../context";

const LoginForm = ({action}) => {
    let usernameInput, passwordInput;
    const submit = (event) => {
        event.preventDefault();
        action({username: usernameInput.value, password: passwordInput.value});
    };
    return (<Fragment>
        <form noValidate>
            <legend>Library Login form</legend>
            <div className="form-group">
                <label htmlFor="username">User name</label>
                <input ref={(input) => usernameInput = input} className="form-control" id="username" type="text"
                       name="username"
                       placeholder="Enter user name"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Passowrd</label>
                <input ref={(input) => passwordInput = input} className="form-control" id="password" type="password"
                       name="password"
                       placeholder="Enter password"/>
            </div>
            <button className="btn btn-primary" onClick={submit}>Sign In</button>
        </form>
        <Link className="float-right" to={ROUTER_LINK.registration}>
            <small>Go to Registration Form></small>
        </Link>
    </Fragment>)
};

LoginForm.propTypes = {
    action: PropTypes.func.isRequired,
};

export default () => (<StateContext.Consumer>
    {({makeSigninRequest}) => (<LoginForm action={makeSigninRequest}/>)}
</StateContext.Consumer>) ;