import {actions} from "../constants/modal-constants";
import {setEventData} from "../utils/helper";

export const showModal = (modalId) => setEventData(actions.SHOW_MODAL, _.set({}, modalId, {opened: true}));

export const hideModal = (modalId) => setEventData(actions.HIDE_MODAL, _.set({}, modalId, {opened: false}));