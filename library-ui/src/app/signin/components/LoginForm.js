import PropTypes from "prop-types";
import {Fragment} from "react";
import {Link} from "react-router-dom";
import ROUTER_LINK from "../constants/router-constants";
import {ServerInfoContext, StateContext} from "../context";
import Message from "./Message";

const LoginForm = ({action, message, showAuthErrorMessage}) => {
    let usernameInput, passwordInput;
    const submit = (event) => {
        event.preventDefault();
        action.signin({username: usernameInput.value, password: passwordInput.value})
            .then(() => {
                location.replace('./');
            })
            .catch((response) => {
                showAuthErrorMessage();
            })
    };
    return (<Fragment>
        <Message message={message} className="alert alert-danger"/>
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
    action: PropTypes.object.isRequired,
    message: PropTypes.string,
    showAuthErrorMessage: PropTypes.func.isRequired,
};

export default ({authErrorMessage}) => (
    <StateContext.Consumer>
        {({showAuthErrorMessage}) => (
            <ServerInfoContext.Consumer>
                {({action}) => (
                    <LoginForm action={action} message={authErrorMessage} showAuthErrorMessage={showAuthErrorMessage}/>)}
            </ServerInfoContext.Consumer>
        )}
    </StateContext.Consumer>
);