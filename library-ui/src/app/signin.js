import "./common";
import {render} from "react-dom";
import SigninPage from "./signin/SigninPage"
import ServerInfoContextLoader from "./common/components/ServerInfoContextLoader";

const appId = 'signin-app';
const App = () => (<ServerInfoContextLoader applicationId={appId}>
    <SigninPage/>
</ServerInfoContextLoader>);
render(<App/>, document.getElementById(appId));