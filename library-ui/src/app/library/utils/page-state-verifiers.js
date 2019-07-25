export const getPage = pagination => {
    const page = _.get(pagination, 'number', 0);
    return page > -1 ? page : 0;
};

export const isPageChanged = ({pagination}, prevProps = {}) => {
    const previousPage = getPage(prevProps.pagination);
    const currentPage = _.get(pagination, 'number', 0);
    return currentPage !== previousPage;
};

export const isSortChanged = ({sort}, prevProps = {}) => {
    return !_.isEqual(sort, prevProps.sort);
};

export const areFiltersChanged = ({filters}, prevProps = {}) => {
    return !_.isEqualWith(filters, prevProps.filters, (thisValue, otherValue) => {
        if (_.isArray(thisValue)) {
            return _.isArray(otherValue) && _.isEqual(_.sortBy(thisValue), _.sortBy(otherValue));
        }
        return _.isEqual(thisValue, otherValue);
    })
};