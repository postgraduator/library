import "lodash";
import {render} from "react-dom";
import "./common";
import ServerInfoContextLoader from "./common/components/ServerInfoContextLoader";
import LibraryMainPage from "./library/components/LibraryMainPage"
import LibraryStoreProvider from "./library/components/LibraryStoreProvider";
import {stateInitializer} from "./library/store/utils/helper";

const appId = 'library-spa';

const App = () => (<ServerInfoContextLoader applicationId={appId}>
    <LibraryStoreProvider>
        <LibraryMainPage/>
    </LibraryStoreProvider>
</ServerInfoContextLoader>);

render(<App/>, document.getElementById(appId));