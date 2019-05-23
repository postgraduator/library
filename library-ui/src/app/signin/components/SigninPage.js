import get from "lodash/get";
import {Component} from "react";
import {HashRouter, Route} from "react-router-dom";
import ROUTER_LINK from "../constants/router-constants";
import {ServerInfoContext, StateContext} from "../context";
import LoginForm from "./LoginForm";
import Message from "./Message";
import RegistrationForm from "./RegistrationForm";

class SigninPage extends Component {
    constructor(props, {error, action}) {
        super(props);
        this.error = error;
        this.signinAction = action;
        this.stateContext = {
            makeSigninRequest: this.makeSigninRequest.bind(this),
            removeAuthMessage: this.removeAuthMessages.bind(this)
        };
    }

    makeSigninRequest(params) {
        this.signinAction.signin(params)
            .then(() => {
                location.replace('./');
            })
            .catch(() => this.setState({authErrorMessage: this.error}));
    }

    removeAuthMessages() {
        let {authErrorMessage} = this.state || {};
        authErrorMessage && this.setState({authErrorMessage: ''});
    }

    render() {
        return (
            <StateContext.Provider value={this.stateContext}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 offset-sm-4">
                            <Message message={get(this.state, 'authErrorMessage')} className="alert alert-danger"/>
                            <HashRouter>
                                <Route exact path={ROUTER_LINK.root} component={LoginForm}/>
                                <Route path={ROUTER_LINK.registration} component={RegistrationForm}/>
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