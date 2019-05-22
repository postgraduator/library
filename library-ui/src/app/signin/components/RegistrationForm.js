import {Fragment} from "react";
import {Link} from "react-router-dom";
import ROUTER_LINK from "../constants/router-constants";
import {ServerInfoContext} from "../context";

const RegistrationForm = () => {
    return (<Fragment>
        <div>Registration Form</div>
        <Link className="float-right" to={ROUTER_LINK.root}>
            <small>Go to Login Form></small>
        </Link>
    </Fragment>)
};

export default () => (<ServerInfoContext.Consumer>
    {() => (<RegistrationForm/>)}
</ServerInfoContext.Consumer>);