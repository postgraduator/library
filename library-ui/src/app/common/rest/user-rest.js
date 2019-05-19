import axios from "axios";

const UserRest = function (apiPath) {
    this._basePath = apiPath + '/users';
};

UserRest.prototype.addUser = function (user, csrf) {
    return axios.post(this._basePath, user, {headers: csrf});
};

export {UserRest};

export default (apiPath) => new UserRest(apiPath);