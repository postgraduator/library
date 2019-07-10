import axios from "axios";
import get from "lodash/get";
import omit from "lodash/omit";
import set from "lodash/set";

const CommonRest = function (collectionName) {
    this._embeddedCollectionPath = `_embedded.${collectionName}`;
};

CommonRest.prototype._getEmbeddedCollection = function ({data}) {
    return set({}, 'data', get(data, this._embeddedCollectionPath, {}));
};

CommonRest.prototype._getRequestFilters = function (filters) {
    return _.reduce(filters, (result, value, key) => value ? _.set(result, key, value) : result, {});
};

CommonRest.prototype._prepareRequestParams = function (page, sort) {
    const params = {page};
    const requestSort = _(sort)
        .mapValues((value, key) => value ? `${key},${value}` : null)
        .values()
        .compact()
        .join(',');
    return requestSort ? _.set(params, 'sort', requestSort) : params;
};

CommonRest.prototype._processCollection = function ({data}) {
    return {
        ...this._getEmbeddedCollection({data}),
        pagination: get(data, 'page')
    };
};

CommonRest.prototype._getFilteredPagedCollection = function (params, searchPath) {
    const nonEmptyFilters = this._getRequestFilters(_.get(params, 'filters'));
    return _.isEmpty(nonEmptyFilters) ?
        this._getPagedCollection(params) :
        axios.get(`${this._basePath}/search/${searchPath}`, {params: _.assign(this._prepareRequestParams(params), nonEmptyFilters)})
            .then(this._processCollection.bind(this));
};

CommonRest.prototype._getPagedCollection = function ({page, sort}) {
    return axios
        .get(this._basePath, {
            params: this._prepareRequestParams(page, sort)
        })
        .then(this._processCollection.bind(this));
};

CommonRest.prototype._getEntityLink = function (entity) {
    return get(entity, '_links.self.href');
};

CommonRest.prototype._removeEntityLinks = function (entity) {
    return omit(entity, '_links');
};

export {CommonRest};