import get from "lodash/get";
import set from "lodash/set";

const CommonRest = function (collectionName) {
    this._embeddedCollectionPath = `_embedded.${collectionName}`;
};

CommonRest.prototype._getEmbeddedCollection = function ({data}) {
    return set({}, 'data', get(data, this._embeddedCollectionPath, {}));
};

export {CommonRest};