import {HashRouter, Route} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import ROUTER_LINK from "./constants/router-constants";

const SigninPage = () => (<div className="container">
    <HashRouter>
        <Route exact path={ROUTER_LINK.root} component={LoginForm}/>
        <Route path={ROUTER_LINK.registration} component={RegistrationForm}/>
    </HashRouter>
</div>);

export default SigninPage;