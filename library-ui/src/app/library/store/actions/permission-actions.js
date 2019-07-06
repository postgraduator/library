import {actions} from "../constants/permission-constants";
import {setEventData} from "../utils/helper";

export const fetchAllPermissions = permissions => setEventData(actions.FETCH_ALL_PERMISSIONS, permissions);