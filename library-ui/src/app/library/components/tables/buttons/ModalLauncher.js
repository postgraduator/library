import PropTypes from "prop-types";

const LAUNCHER_PROP_TYPES = {
    title: PropTypes.string.isRequired,
    launcher: PropTypes.func.isRequired
};

export const AddModalLauncher = ({title, launcher}) => (<button className="btn btn-secondary btn-sm"
                                                                   onClick={launcher}>
    {title}
</button>);



AddModalLauncher.propTypes = LAUNCHER_PROP_TYPES;

export const UpdateModalLauncher = ({title, launcher}) => (<button className="btn btn-outline-secondary btn-sm"
                                                                   onClick={launcher}>
    {title}
</button>);

UpdateModalLauncher.propTypes = LAUNCHER_PROP_TYPES;