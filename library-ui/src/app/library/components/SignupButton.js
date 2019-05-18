import PropTypes from "prop-types";

const SignupButton = (props, {actionUrl, csrf}) => (<form action={actionUrl} method="POST">
    <input type="hidden" name={csrf.parameterName} value={csrf.token}/>
    <button type="submit" className="btn btn-link">Sign Up</button>
</form>);

SignupButton.contextTypes = {
    actionUrl: PropTypes.string,
    csrf: PropTypes.object
};

export default SignupButton;