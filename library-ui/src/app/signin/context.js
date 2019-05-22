import flow from "lodash/flow";
import {createContext} from "react";
import {getServerInfoContext} from "../common/utils/server-info";
import {createRestService} from "./rest/rest-factory";
import {createSigninUserAction} from "./rest/user-action";

const SIGNIN_APP_ID = 'signin-app';

const processServerInfoContext = (serverInfo) => {
    return {
        RestService: createRestService(serverInfo),
        action: createSigninUserAction(serverInfo.actionUrl, serverInfo.csrf),
        error: serverInfo.error
    };
};

const ServerInfoContext = flow(getServerInfoContext, processServerInfoContext, createContext)(SIGNIN_APP_ID);

const StateContext = createContext({});

export {SIGNIN_APP_ID, ServerInfoContext, StateContext};