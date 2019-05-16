import "./common";
import {render} from "react-dom";
import SigninPage from "./signin/SigninPage"
import CsrfContextLoader from "./common/components/CsrfContextLoader";

const appId = 'signin-app';
const App = () => (<CsrfContextLoader applicationId={appId}>
    <SigninPage/>
</CsrfContextLoader>);
render(<App/>, document.getElementById(appId));