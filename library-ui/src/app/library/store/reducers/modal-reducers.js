import {actions} from "../constants/modal-constants";
import {extractEventData} from "../utils/helper";

export const modal = (state = {}, action) => {
    if (_.includes(actions, action.type)) {
        const requestedModalState = extractEventData(action);
        const modalId = _(requestedModalState)
            .keys()
            .head();
        const newModalState = _.assign(_.get(state, modalId), _.get(requestedModalState, modalId));
        return _.assign({...state}, _.set({}, modalId, newModalState));
    }
    return state;
};