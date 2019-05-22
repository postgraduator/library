import axios from "axios";

const UserRest = function (apiPath, csrf) {
    this._basePath = apiPath + '/users';
    this._csrf = csrf;
};

UserRest.prototype.addUser = function (user) {
    return axios.post(this._basePath, user, {headers: this._csrf.header});
};

export {UserRest};

export const createUserRest = (apiPath) => new UserRest(apiPath);