import PropTypes from "prop-types";
import {Fragment} from "react";

export const CommonAlert = ({text, className}) => (<Fragment>{text && <div className={className}>
    {text}
</div>}
</Fragment>);

CommonAlert.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string
};

export const DangerAlert = ({text}) => (<Fragment>{text && <div className="alert alert-danger">
    {text}
</div>}
</Fragment>);

DangerAlert.propTypes = {
    text: PropTypes.string
};