export const warningCrudAction = text => ({
    pagination: {
        number: 0
    },
    message: {
        text,
        className: 'alert alert-warning'
    },
    refreshed: false
});

export const successCrudAction = text => ({
    pagination: {
        number: 0
    },
    message: {
        text,
        className: 'alert alert-success'
    },
    refreshed: false
});

export const dangerAction = text => ({
    message: {
        text,
        className: 'alert alert-danger'
    }
});

export const fetchAction = (items, pagination) => ({
    items: _.isArray(items) ? [...items] : [],
    pagination,
    refreshed: true
});

export const removeMessage = () => ({message: {}});