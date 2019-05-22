import axios from "axios";

const GenderRest = function (apiPath) {
    this._genderPath = apiPath + '/genders';
};

GenderRest.prototype = function () {
    return axios.get(this._genderPath);
};

export const createGenderRest = (apiPath) => new GenderRest(apiPath);