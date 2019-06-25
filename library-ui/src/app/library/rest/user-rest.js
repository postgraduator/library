import axios from "axios";
import {UserRest as CommonUserRest} from "../../common/rest/user-rest";

const UserRest = function (apiPath, csrf) {
    CommonUserRest.call(this, apiPath, csrf);
};

UserRest.prototype = Object.create(CommonUserRest.prototype);

UserRest.prototype.fetchCurrentUser = function () {
    return axios.get(this._basePath + '/search/current');
};

UserRest.prototype.getUsers = function (params) {
    return this._getPagedCollection(params);
};

export const createUserRest = ({apiPath, csrf}) => new UserRest(apiPath, csrf);