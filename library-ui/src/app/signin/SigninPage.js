import {HashRouter, Route} from "react-router-dom";
import ContextHandler from "./components/ContextHandler";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import ROUTER_LINK from "./constants/router-constants";

const SigninPage = () => (<ContextHandler>
    <div className="container">
        <div className="row">
            <div className="col-sm-4 offset-sm-4">
                <HashRouter>
                    <Route exact path={ROUTER_LINK.root} component={LoginForm}/>
                    <Route path={ROUTER_LINK.registration} component={RegistrationForm}/>
                </HashRouter>
            </div>
        </div>
    </div>
</ContextHandler>);

export default SigninPage;