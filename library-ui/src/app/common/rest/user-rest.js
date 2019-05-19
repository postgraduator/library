import axios from "axios";

const UserRest = function (apiPath) {
    this._basePath = apiPath + '/users';
};

UserRest.prototype.addUser = function (user, csrf) {
    return axios.post(this._basePath, user, {headers: csrf});
};

const createUserRest = (apiPath) => new UserRest(apiPath);

export {UserRest};

export default createUserRest;