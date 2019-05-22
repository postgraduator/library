import get from "lodash/get";
import PropTypes from "prop-types";
import {Component, Fragment} from "react";
import {HashRouter, Route} from "react-router-dom";
import ROUTER_LINK from "../constants/router-constants";
import {ServerInfoContext, StateContext} from "../context";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

class SigninPage extends Component {
    constructor(props, {error}) {
        super(props);
        this.error = error;
        this.contextValue = {
            showAuthErrorMessage: this.showAuthErrorMessage.bind(this),
            showRegistrationSuccessMessage: this.showRegistrationSuccessMessage.bind(this)
        }
    }

    showAuthErrorMessage() {
        this.setState({authErrorMessage: this.error});
    }

    showRegistrationSuccessMessage(message) {
        this.setState({successMessage: message});
    }

    _removeAuthMessages() {
        let {authErrorMessage} = this.state || {};
        authErrorMessage && this.setState({authErrorMessage: ''});
    }

    render() {
        let authErrorMessage = get(this.state, 'authErrorMessage');
        const LoginFormComponent = () => {
            return (<LoginForm authErrorMessage={authErrorMessage}/>)
        };
        const RegistrationFormComponent = () => {
            this._removeAuthMessages();
            return (<RegistrationForm/>);
        };
        return (
            <StateContext.Provider value={this.contextValue}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 offset-sm-4">
                            <HashRouter>
                                <Route exact path={ROUTER_LINK.root} component={LoginFormComponent}/>
                                <Route path={ROUTER_LINK.registration} component={RegistrationFormComponent}/>
                            </HashRouter>
                        </div>
                    </div>
                </div>
            </StateContext.Provider>
        )
    }
}

SigninPage.contextType = ServerInfoContext;

export default SigninPage;