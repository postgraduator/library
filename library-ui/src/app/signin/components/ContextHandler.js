import {Component, Fragment} from "react";
import PropTypes from "prop-types";
import createUserRest from "../../common/rest/user-rest";

class ContextHandler extends Component{
    getChildContext() {
        return {
            userRestService: this.userRestService,
            getErrorMessage: this.getErrorMessage.bind(this),
            removeErrorMessage: this.removeErrorMessage.bind(this)
        }
    }
    constructor(props, {apiPath}) {
        super(props);
        this.userRestService = createUserRest(apiPath);
        this.removeErrorMessage = () => this.setState({message: ''});
        this.getErrorMessage = () => this.state.message;
    }
    componentWillMount() {
        this.setState({message: this.context.error})
    }
    render() {
        return (<Fragment>{this.props.children}</Fragment>);
    }
}

ContextHandler.childContextTypes = {
    userRestService: PropTypes.object.isRequired,
    removeErrorMessage: PropTypes.func.isRequired,
    getErrorMessage: PropTypes.func.isRequired
};

ContextHandler.contextTypes = {
    apiPath: PropTypes.string,
    error: PropTypes.string
};

export default ContextHandler;