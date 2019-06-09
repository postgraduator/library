import PropTypes from "prop-types";
import {serverInfoContext} from "../context";

const SignupButton = ({actionUrl, csrf}) => {
    return (<form className="form-inline" action={actionUrl} method="POST">
        <input type="hidden" name={csrf.parameterName} value={csrf.token}/>
        <button type="submit" className="btn btn-link">Sign Up</button>
    </form>)
};

SignupButton.propTypes = {
    actionUrl: PropTypes.string.isRequired,
    csrf: PropTypes.object.isRequired
};

export default () => SignupButton(serverInfoContext);