import {HashRouter, Route} from "react-router-dom";
import ROUTER_LINK from "./constants/router-constants";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";

const SigninPage = () => (<div className="container">
    <HashRouter>
        <Route exact path={ROUTER_LINK.root} component={LoginForm}/>
        <Route path={ROUTER_LINK.registration} component={RegistrationForm}/>
    </HashRouter>
</div>);

export default SigninPage;