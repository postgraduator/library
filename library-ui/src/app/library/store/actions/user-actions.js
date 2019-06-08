import {actions} from "../constants/user-constants";
import {setEventData} from "../utils/helper";

export const fetchUser = (user) => setEventData(actions.GET_USER, {...user});