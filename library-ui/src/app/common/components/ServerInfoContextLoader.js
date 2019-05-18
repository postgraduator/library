import {Component, Fragment} from "react";
import PropTypes from "prop-types";

class ServerInfoContextLoader extends Component {
    getChildContext() {
        return {
            csrf: this.csrf,
            actionUrl: this.actionUrl,
            error: this.error
        };
    }
    constructor(props) {
        super(props);
        const {applicationId} = props;
        const appEntryPointDataSet = document.getElementById(applicationId).dataset;
        this.csrf = {
            header: appEntryPointDataSet.csrfHeader,
            parameterName: appEntryPointDataSet.csrfParameterName,
            token: appEntryPointDataSet.csrfToken
        };
        this.actionUrl = appEntryPointDataSet.actionUrl || '';
        this.error = appEntryPointDataSet.error || '';
    }
    render() {
        return (<Fragment>{this.props.children}</Fragment>);
    }
}

ServerInfoContextLoader.propTypes = {
    applicationId: PropTypes.string.isRequired,
};

ServerInfoContextLoader.childContextTypes = {
    csrf: PropTypes.object.isRequired,
    error: PropTypes.string.isRequired,
    actionUrl: PropTypes.string.isRequired
};

export default ServerInfoContextLoader;