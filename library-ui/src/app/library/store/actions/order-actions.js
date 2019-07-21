import {actions} from "../constants/order-constants";
import {setEventData} from "../utils/helper";
import {dangerAction, removeMessage, successCrudAction} from "./common-actions";

export const makeOrder = () => setEventData(actions.MAKE_ORDER, successCrudAction("Your ge order was saved."));

export const addToOrder = ({book, count}) => setEventData(actions.ADD_TO_ORDER, {book, count});

export const changeOrder = books => setEventData(actions.CHANGE_ORDER, books);

export const removeOrderMessage = () => removeMessage();

export const showOrderErrorMessage = () => dangerAction("The order can not be made");