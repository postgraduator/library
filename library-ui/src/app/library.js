import "./common";
import {render} from "react-dom";
import ServerInfoContextLoader from "./common/components/ServerInfoContextLoader";
import LibraryMainPage from "./library/components/LibraryMainPage"

const appId = 'library-spa';

const App = () => (<ServerInfoContextLoader applicationId={appId}>
    <LibraryMainPage/>
</ServerInfoContextLoader>);

render(<App/>, document.getElementById(appId));