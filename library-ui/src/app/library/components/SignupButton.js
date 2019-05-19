import PropTypes from "prop-types";
import {connect} from "react-redux";

const SignupButton = ({actionUrl, csrf}) => {
    return (<form action={actionUrl} method="POST">
        <input type="hidden" name={csrf.parameterName} value={csrf.token}/>
        <button type="submit" className="btn btn-link">Sign Up</button>
    </form>)
};

SignupButton.propTypes = {
    actionUrl: PropTypes.string.isRequired,
    csrf: PropTypes.object.isRequired
};

export default connect(({serverInfo}) => ({actionUrl: serverInfo.actionUrl, csrf: serverInfo.csrf}))(SignupButton);