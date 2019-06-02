import axios from "axios";
import set from "lodash/set";
import {CommonRest} from "./common-rest";

const UserRest = function (apiPath, csrf) {
    CommonRest.call(this, 'users');
    this._basePath = apiPath + '/users';
    this._csrf = csrf;
};

UserRest.prototype = Object.create(CommonRest);
UserRest.prototype = CommonRest;

UserRest.prototype._updateGender = (user) => user.gender ? user : set(user, 'gender', null);

UserRest.prototype.addUser = function (user) {
    return axios.post(this._basePath, this._updateGender(user), {headers: this._csrf.header});
};

export {UserRest};

export const createUserRest = (apiPath, csrf) => new UserRest(apiPath, csrf);