import {actions} from "../constants/modal-constants";
import {setEventData} from "../utils/helper";

export const showModal = (modalId, data) => setEventData(actions.SHOW_MODAL, _.set({}, modalId, {opened: true, data}));

export const hideModal = modalId => setEventData(actions.HIDE_MODAL, _.set({}, modalId, {opened: false, message: {}}));

export const showModalMessage = (modalId, message) => setEventData(actions.SHOW_MODAL_MESSAGE, _.set({}, modalId, {message}));