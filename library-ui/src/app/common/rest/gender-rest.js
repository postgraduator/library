import axios from "axios";
import get from "lodash/get";
import {CommonRest} from "./common-rest";

const GenderRest = function (apiPath) {
    CommonRest.call(this);
    this._genderPath = apiPath + '/genders';
};

GenderRest.prototype.getGenders = function () {
    return axios.get(this._genderPath).then(({data}) => {
        return get(data, this._embedded)
    });
};

export const createGenderRest = (apiPath) => new GenderRest(apiPath);