import PropTypes from "prop-types";
import {Fragment} from "react";

const Message = ({message, className}) => (<Fragment>
    {message && <div className={className}>{message}</div>}
</Fragment>);

Message.propTypes = {
    message: PropTypes.string,
    className: PropTypes.string
};

export default Message;