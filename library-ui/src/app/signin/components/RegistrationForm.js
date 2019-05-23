import PropTypes from "prop-types";
import {Fragment} from "react";
import {Link} from "react-router-dom";
import ROUTER_LINK from "../constants/router-constants";
import {StateContext} from "../context";

const RegistrationForm = ({removeAuthMessage}) => {
    removeAuthMessage();
    return (<Fragment>
        <div>Registration Form</div>
        <Link className="float-right" to={ROUTER_LINK.root}>
            <small>Go to Login Form></small>
        </Link>
    </Fragment>)
};

RegistrationForm.propTypes = {
    removeAuthMessage: PropTypes.func.isRequired
};

export default () => (<StateContext.Consumer>
    {({removeAuthMessage}) => (<RegistrationForm removeAuthMessage={removeAuthMessage}/>)}
</StateContext.Consumer>);