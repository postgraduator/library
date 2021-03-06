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
    const searchPath = filters => filters ? 'name-contains' : this._basePath;
    return this._getFilteredPagedCollection(params, searchPath);
};

UserRest.prototype.deleteUser = function (user) {
    return axios.delete(this._getEntityLink(user), {headers: {...this._csrf.header}})
        .then(() => this._removeEntityLinks(user));
};

UserRest.prototype.updatePermission = function ({user, newPermission}) {
    return axios.put(`${this._getEntityLink(user)}/change-permission`, null, {
        params: {name: newPermission},
        headers: {...this._csrf.header}
    })
};

UserRest.prototype.updateProfile = function (user) {
    return axios.put(this._getEntityLink(user), this._updateGender(this._removeEntityLinks(user)), {headers: {...this._csrf.header}})
};

UserRest.prototype.getUserById = function (userId) {
    return axios.get(`${this._basePath}/${userId}`);
};

export const createUserRest = ({apiPath, csrf}) => new UserRest(apiPath, csrf);