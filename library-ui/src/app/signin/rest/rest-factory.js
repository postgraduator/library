import {createGenderRest} from "../../common/rest/gender-rest";
import {createUserRest} from "../../common/rest/user-rest";

export const createRestService = ({apiPath, csrf}) => {
    return {
        user: createUserRest(apiPath, csrf),
        gender: createGenderRest(apiPath)
    }
};