import {createGenderRest} from "../common/rest/gender-rest";
import {getServerInfoContext} from "../common/utils/server-info";
import {createBookRest} from "./rest/book-rest";
import {createPermissionRest} from "./rest/permission-rest";
import {createUserRest} from "./rest/user-rest";

const LIBRARY_APP_ID = 'library-spa';

const serverInfoContext = getServerInfoContext(LIBRARY_APP_ID);

const createRestFromServerInfoContext = serverInfoContext => ({
    user: createUserRest(serverInfoContext),
    gender: createGenderRest(serverInfoContext.apiPath),
    book: createBookRest(serverInfoContext),
    permission: createPermissionRest(serverInfoContext)
});

const rest = createRestFromServerInfoContext(serverInfoContext);

export {LIBRARY_APP_ID, rest, serverInfoContext};