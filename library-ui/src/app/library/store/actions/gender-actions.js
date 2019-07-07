import {actions} from "../constants/gender-constants";
import {setEventData} from "../utils/helper";

export const getGenders = genders => setEventData(actions.FETCH_GENDERS, genders);