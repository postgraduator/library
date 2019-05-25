import get from "lodash/get";

const CommonRest = function () {
    this._embedded = '_embedded';
};

CommonRest.prototype._getEmbedded = function ({data}) {
    return get(data, this._embedded, {});
};

export {CommonRest};