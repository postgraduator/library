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
    return _.reduce(filters, (result, value, key) => value || _.isNumber(value) ? _.set(result, key, value) : result, {});
};

CommonRest.prototype._prepareRequestParams = function ({page, sort, size}) {
    const params = {page};
    size > 0 && _.set(params, 'size', size);
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
    const {filters} = params;
    const nonEmptyFilters = this._getRequestFilters(filters);
    return _.isEmpty(nonEmptyFilters) ?
        this._getPagedCollection(params, searchPath()) :
        axios.get(`${this._basePath}/search/${searchPath(nonEmptyFilters)}`, {params: _.assign(this._prepareRequestParams(params), nonEmptyFilters)})
            .then(this._processCollection.bind(this));
};

CommonRest.prototype._getPagedCollection = function (params, path) {
    return axios
        .get(path || this._basePath, {
            params: this._prepareRequestParams(params)
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