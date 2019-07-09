export const warningCrudAction = text => ({
    pagination: {
        number: -1
    },
    message: {
        text,
        className: 'alert alert-warning'
    }
});

export const successCrudAction = text => ({
    pagination: {
        number: -1
    },
    message: {
        text,
        className: 'alert alert-success'
    }
});

export const dangerAction = text => ({
    message: {
        text,
        className: 'alert alert-danger'
    }
});

export const fetchAction = (items, pagination, sort, filters) => ({
    items: _.isArray(items) ? [...items] : [],
    pagination,
    sort,
    filters
});

export const removeMessage = () => ({message: {}});