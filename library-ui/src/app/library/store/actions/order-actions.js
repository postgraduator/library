import {actions} from "../constants/order-constants";
import {setEventData} from "../utils/helper";
import {dangerAction, removeMessage, successCrudAction} from "./common-actions";

export const makeOrder = () => setEventData(actions.MAKE_ORDER, successCrudAction("Your ge order was saved."));

export const addToOrder = ({book, count}) => setEventData(actions.ADD_TO_ORDER, {book, count});

export const addOneToOrder = book => setEventData(actions.ADD_ONE_TO_ORDER, book);

export const removeOrderMessage = () => setEventData(actions.REMOVE_ORDER_MESSAGE, removeMessage());

export const showOrderErrorMessage = () => dangerAction("The order can not be made");