import {Fragment} from "react";
import {Link} from "react-router-dom";
import ProfileForm from "../../common/components/ProfileForm";
import {profileRestrictions as restrictions, USER_MIN_AGE} from "../../common/validation/profile-yup-schema";
import ROUTER_LINK from "../constants/router-constants";
import {StateContext} from "../context";

export default () => (<StateContext.Consumer>
    {({genders, removeAuthMessage, registerUser}) => {
        removeAuthMessage();
        return <Fragment>
            <ProfileForm genders={genders}
                         minAge={USER_MIN_AGE}
                         formAction={registerUser}
                         restrictions={restrictions}
                         initialValues={{
                             name: '',
                             email: '',
                             password: '',
                             confirmedPassword: '',
                             gender: '',
                             birthday: ''
                         }}/>
            <Link className="float-right" to={ROUTER_LINK.root}>
                <small>Go to Login Form></small>
            </Link>
        </Fragment>
    }}
</StateContext.Consumer>);