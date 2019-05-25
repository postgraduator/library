import axios from "axios";
import {CommonRest} from "./common-rest";

const GenderRest = function (apiPath) {
    CommonRest.call(this);
    this._genderPath = apiPath + '/genders';
};

GenderRest.prototype = Object.create(CommonRest.prototype);

GenderRest.prototype.getGenders = function () {
    return axios.get(this._genderPath).then(this._getEmbedded.bind(this));
};

export const createGenderRest = (apiPath) => new GenderRest(apiPath);