import get from "lodash/get";
import {Component} from "react";
import {HashRouter, Route, Switch} from "react-router-dom";
import ROUTER_LINK from "../constants/router-constants";
import {ServerInfoContext, StateContext} from "../context";
import LoginForm from "./LoginForm";
import Message from "./Message";
import RegistrationForm from "./RegistrationForm";

class SigninPage extends Component {
    constructor(props, {action, RestService}) {
        super(props);
        this.signinAction = action;
        this.userService = RestService.user;
        RestService.gender.getGenders()
            .then(({data}) => this.setState({genders: data}))
            .catch(() => this.setState({genderError: 'The gender list can not bew retrieved'}));
    }

    _getStateContext() {
        return {
            makeSigninRequest: this.makeSigninRequest.bind(this),
            removeAuthMessage: this.removeAuthMessages.bind(this),
            removeRegistrationMessage: this.removeRegistrationMessage.bind(this),
            registerUser: this.registerUser.bind(this)
        };
    }

    registerUser(params) {
        return this.userService.addUser(params)
            .then(({data}) => {
                    this.setState({
                        successRegistrationMessage: `The user '${data.name}' is registered`,
                        errorRegistrationMessage: ''
                    });
                    return {data}
                }
            )
            .catch(() => this.setState({errorRegistrationMessage: 'The user can not be added.'}))
    }

    makeSigninRequest(params) {
        this.signinAction.signin(params)
            .then(() => {
                location.replace('./');
            })
            .catch(({response}) => {
                this.setState({
                    authErrorMessage: get(response, 'data.message')
                })
            });
    }

    removeAuthMessages() {
        let {authErrorMessage} = this.state || {};
        authErrorMessage && this.setState({authErrorMessage: ''});
    }

    removeRegistrationMessage() {
        let {successRegistrationMessage, errorRegistrationMessage} = this.state || {};
        (successRegistrationMessage || errorRegistrationMessage) &&
        this.setState({successRegistrationMessage: '', errorRegistrationMessage: ''});
    }

    _getErrorMessage() {
        let {genderError, authErrorMessage, errorRegistrationMessage} = this.state || {};
        return genderError || authErrorMessage || errorRegistrationMessage || '';
    }

    render() {
        return (
            <StateContext.Provider value={{...this._getStateContext(), genders: get(this.state, 'genders')}}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 offset-sm-4">
                            <Message message={this._getErrorMessage()} className="alert alert-danger"/>
                            <Message message={get(this.state, 'successRegistrationMessage')}
                                     className="alert alert-success"/>
                            <HashRouter>
                                <Switch>
                                    <Route exact path={ROUTER_LINK.root} component={LoginForm}/>
                                    <Route path={ROUTER_LINK.registration} component={RegistrationForm}/>
                                    <Route component={LoginForm}/>
                                </Switch>
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