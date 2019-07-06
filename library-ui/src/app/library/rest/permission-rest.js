import axios from "axios";
import {CommonRest} from "../../common/rest/common-rest";

const PermissionRest = function (apiPath) {
    CommonRest.call(this, 'permissions');
    this._permissionPath = `${apiPath}/permissions`
};

PermissionRest.prototype = Object.create(CommonRest.prototype);

PermissionRest.prototype.getAll = function () {
    return axios.get(this._permissionPath)
        .then(this._getEmbeddedCollection.bind(this));
};

export const createPermissionRest = ({apiPath}) => new PermissionRest(apiPath);