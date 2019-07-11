import PropTypes from "prop-types";
import {Component, Fragment} from "react";
import {connect} from "react-redux";
import ProfileForm from "../../common/components/ProfileForm";
import {profileRestrictions, USER_MIN_AGE} from "../../common/validation/profile-yup-schema";
import {rest} from "../context";
import {removeCurrentUserMessage, showCurrentUserErrorMessage, updateCurrentUser} from "../store/actions/current-user-actions";
import {getGenders} from "../store/actions/gender-actions"
import {CommonAlert} from "./alerts/alert";

class Profile extends Component {
    render() {
        const {genders, initialValues, minAge, formAction, restrictions, message = {}} = this.props;
        return <Fragment>
            <CommonAlert text={message.text} className={message.className}/>
            <ProfileForm formAction={formAction}
                         minAge={minAge}
                         initialValues={initialValues}
                         restrictions={restrictions}
                         buttonName={'Update profile'}
                         genders={genders}/>
        </Fragment>
    }

    componentDidMount() {
        const {fetchGenders, removeMessage} = this.props;
        removeMessage();
        fetchGenders();
    }
}

Profile.propTypes = {
    genders: PropTypes.array.isRequired,
    initialValues: PropTypes.object.isRequired,
    minAge: PropTypes.number.isRequired,
    formAction: PropTypes.func.isRequired,
    fetchGenders: PropTypes.func.isRequired,
    removeMessage: PropTypes.func.isRequired,
    message: PropTypes.object,
    restrictions: PropTypes.object
};

export default connect(({genders, current}) => {
    const currentUser = _.get(current, 'user', {});
    return {
        genders,
        message: _.get(current, 'message'),
        initialValues: {
            ..._(currentUser)
                .keys()
                .reduce((user, key) => _.set(user, key, _.get(currentUser, key) || ''), {}),
            password: '',
            confirmedPassword: ''
        },
        minAge: USER_MIN_AGE,
        restrictions: _.omit(profileRestrictions, 'password.validators.required')
    }
}, dispatch => ({
    fetchGenders: () => rest.gender.getGenders()
        .then(({data}) => dispatch(getGenders(data))),
    formAction: user => rest.user.updateProfile(user)
        .then(({data}) => dispatch(updateCurrentUser(data)))
        .catch(({message}) => dispatch(showCurrentUserErrorMessage(message || 'An unexpected server error occurred.'))),
    removeMessage: () => dispatch(removeCurrentUserMessage())
}))(Profile);