import {getServerInfoContext} from "../common/utils/server-info";

const LIBRARY_APP_ID = 'library-spa';

const contextReducer = () => getServerInfoContext(LIBRARY_APP_ID);

export {contextReducer, LIBRARY_APP_ID};