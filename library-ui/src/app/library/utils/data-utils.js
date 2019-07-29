export const getUniqueKey = ({_links}) => {
    const href = _.get(_links, 'self.href');
    return _(href)
        .split('/')
        .last();
};