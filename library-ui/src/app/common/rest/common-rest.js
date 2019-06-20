import get from "lodash/get";
import omit from "lodash/omit";
import set from "lodash/set";

const CommonRest = function (collectionName) {
    this._embeddedCollectionPath = `_embedded.${collectionName}`;
};

CommonRest.prototype._getEmbeddedCollection = function ({data}) {
    return set({}, 'data', get(data, this._embeddedCollectionPath, {}));
};

CommonRest.prototype._getEntityLink = function (entity) {
    return get(entity, '_links.self.href');
};

CommonRest.prototype._removeEntityLinks = function (entity) {
    return omit(entity, '_links');
};

export {CommonRest};