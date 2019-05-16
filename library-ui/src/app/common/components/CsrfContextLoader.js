import {Component, Fragment} from "react";
import PropTypes from "prop-types";

class CsrfContextLoader extends Component {
    getChildContext() {
        return {
            csrf: this.csrf
        };
    }
    constructor(props) {
        super(props);
        const {applicationId} = props;
        const appEntryPointDataSet = document.getElementById(applicationId).dataset;
        this.csrf = {
            header: appEntryPointDataSet.csrfHeader,
            token: appEntryPointDataSet.csrfToken
        };
    }
    render() {
        return (<Fragment>{this.props.children}</Fragment>);
    }
}

CsrfContextLoader.propTypes = {
    applicationId: PropTypes.string.isRequired,
};

CsrfContextLoader.childContextTypes = {
    csrf: PropTypes.object.isRequired
};

export default CsrfContextLoader;