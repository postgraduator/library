import {Component} from "react";
import {HashRouter, Route} from "react-router-dom";
import ROUTER_LINK from "../constants/router-constants";
import {ServerInfoContext} from "../context";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

class SigninPage extends Component {
    constructor(props, {error}) {
        super(props);
        this.error = error;
    }
    componentWillMount() {
        this.setState({message: this.error})
    }
    render() {
        let {message} = this.state;
        const LoginFormComponent = () => (<LoginForm errorMessage={message}/>);
        const RegistrationFormComponent = () => {
            this.state.message && this.setState({message: ''});
            return (<RegistrationForm/>);
        };
        return (<div className="container">
            <div className="row">
                <div className="col-sm-4 offset-sm-4">
                    <HashRouter>
                        <Route exact path={ROUTER_LINK.root} component={LoginFormComponent}/>
                        <Route path={ROUTER_LINK.registration} component={RegistrationFormComponent}/>
                    </HashRouter>
                </div>
            </div>
        </div>)
    }
}

SigninPage.contextType = ServerInfoContext;

export default SigninPage;