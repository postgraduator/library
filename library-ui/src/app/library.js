import "lodash";
import {render} from "react-dom";
import "./common";
import LibraryMainPage from "./library/components/LibraryMainPage"
import LibraryStoreProvider from "./library/components/LibraryStoreProvider";
import {LIBRARY_APP_ID} from "./library/context";
import {stateInitializer} from "./library/store/utils/helper";

const App = () => (<LibraryStoreProvider>
    <LibraryMainPage/>
</LibraryStoreProvider>);

render(<App/>, document.getElementById(LIBRARY_APP_ID));