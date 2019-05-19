import {getServerInfoContext} from "../common/utils/server-info";

const LIBRARY_APP_ID = 'library-spa';

const serverInfo = getServerInfoContext(LIBRARY_APP_ID);
const contextReducer = () => ({...serverInfo});

export {contextReducer, LIBRARY_APP_ID};