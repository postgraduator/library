const EVENT_CONTAINER_NAME = 'eventData';

export const extractEventData = (action) => _.get(action, EVENT_CONTAINER_NAME);

export const setEventData = (actionType, eventData) => {
    let action = _.set({}, 'type', actionType);
    return _.set(action, EVENT_CONTAINER_NAME, eventData);
};

export const bindRestWithDispatcher = ({action, restAction, dispatch}) => (params) => restAction(params)
    .then(({data}) => dispatch(action(data)));

export const initState = (rests, dispatch, params) => {
    _.forEach(rests, (rest) => bindRestWithDispatcher({...rest, dispatch})(params));
};

export const createReducer = (defaultState, actions) => (state = defaultState, action) => {
    const available = _(actions)
        .values()
        .some(availableActionType => availableActionType === action.type);
    if (available) {
        return _.assign({...state}, extractEventData(action));
    }
    return state;
};