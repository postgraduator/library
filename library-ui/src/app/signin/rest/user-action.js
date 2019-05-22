import axios from "axios";
import assign from "lodash/assign";
import set from "lodash/set";

const SigninUserAction = function (actionUrl, csrf) {
    this._actionUrl = actionUrl;
    this._csrfPair = set({}, csrf.parameterName, csrf.token);
};

SigninUserAction.prototype.signin = function (requestParams) {
    let params = assign(this._csrfPair, {...requestParams});
    return axios.post(this._actionUrl, {}, {params});
};

export const createSigninUserAction = (actionUrl, csrf) => new SigninUserAction(actionUrl, csrf);