import PropTypes from "prop-types";
import {Fragment} from "react";
import {Link} from "react-router-dom";
import createGenderRest from "../../common/rest/gender-rest";
import createUserRest from "../../common/rest/user-rest";
import ROUTER_LINK from "../constants/router-constants";
import {ServerInfoContext} from "../context";

const RegistrationForm = ({apiPath}) => {
    const genderRest = createGenderRest(apiPath);
    const userRest = createUserRest(apiPath);
    return (<Fragment>
        <div>Registration Form</div>
        <Link className="float-right" to={ROUTER_LINK.root}>
            <small>Go to Login Form></small>
        </Link>
    </Fragment>)
};

RegistrationForm.propTypes = {
    apiPath: PropTypes.string.isRequired
};

export default () => (<ServerInfoContext.Consumer>
    {({apiPath}) => (<RegistrationForm apiPath={apiPath}/>)}
</ServerInfoContext.Consumer>);