import PropTypes from "prop-types";
import {Fragment} from "react";

export const CommonAlert = ({text, className, closeMessage}) => (<Fragment>{text && <div className={className}>
    {text}
    {closeMessage && <button type="button" className="close float-sm-right" onClick={closeMessage}>
        <span aria-hidden="true">&times;</span>
    </button>}
</div>}
</Fragment>);

CommonAlert.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    closeMessage: PropTypes.func
};

export const DangerAlert = ({text}) => (<Fragment>{text && <div className="alert alert-danger">
    {text}
</div>}
</Fragment>);

DangerAlert.propTypes = {
    text: PropTypes.string
};