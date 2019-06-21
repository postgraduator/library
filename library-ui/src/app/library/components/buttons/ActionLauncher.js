import PropTypes from "prop-types";

const LAUNCHER_PROP_TYPES = {
    title: PropTypes.string.isRequired,
    launcher: PropTypes.func.isRequired
};

export const SecondaryButton = ({title, launcher}) => (<button className="btn btn-secondary btn-sm"
                                                               onClick={launcher}>
    {title}
</button>);

SecondaryButton.propTypes = LAUNCHER_PROP_TYPES;

export const OutlineSecondaryButton = ({title, launcher}) => (<button className="btn btn-outline-secondary btn-sm"
                                                                      onClick={launcher}>
    {title}
</button>);

OutlineSecondaryButton.propTypes = LAUNCHER_PROP_TYPES;

export const OutlineDangerButton = ({title, launcher}) => (<button className="btn btn-outline-danger btn-sm"
                                                                   onClick={launcher}>
    {title}
</button>);

OutlineDangerButton.propTypes = LAUNCHER_PROP_TYPES;

export const PrimaryButton = ({title, launcher}) => (<button className="btn btn-primary"
                                                                       onClick={launcher}>
    {title}
</button>);

PrimaryButton.propTypes = LAUNCHER_PROP_TYPES;

export const LightButton = ({title, launcher}) => (<button className="btn btn-light"
                                                           onClick={launcher}>
    {title}
</button>);

LightButton.propTypes = LAUNCHER_PROP_TYPES;