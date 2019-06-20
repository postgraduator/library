import "./css/style.css";
import "lodash";
import React from "react";
import {render} from "react-dom";
import LibraryMainPage from "./components/LibraryMainPage"
import LibraryStoreProvider from "./components/LibraryStoreProvider";
import {LIBRARY_APP_ID} from "./context";
import {stateInitializer} from "./store/utils/helper";

const App = () => (<LibraryStoreProvider>
    <LibraryMainPage/>
</LibraryStoreProvider>);

render(<App/>, document.getElementById(LIBRARY_APP_ID));