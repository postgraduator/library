import {render} from "react-dom";
import "./common";
import ServerInfoContextLoader from "./common/components/ServerInfoContextLoader";
import SigninPage from "./signin/SigninPage"

const appId = 'signin-app';
const App = () => (<ServerInfoContextLoader applicationId={appId}>
    <SigninPage/>
</ServerInfoContextLoader>);
render(<App/>, document.getElementById(appId));