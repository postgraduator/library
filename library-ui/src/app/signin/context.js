import flow from "lodash/flow";
import {createContext} from "react";
import {getServerInfoContext} from "../common/utils/server-info";

const SIGNIN_APP_ID = 'signin-app';

const ServerInfoContext = flow(getServerInfoContext, createContext)(SIGNIN_APP_ID);

export {SIGNIN_APP_ID, ServerInfoContext};