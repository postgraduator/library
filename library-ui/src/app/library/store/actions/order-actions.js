import {actions} from "../constants/order-constants";
import {setEventData} from "../utils/helper";
import {dangerAction, removeMessage} from "./common-actions";

export const makeOrder = () => setEventData(actions.MAKE_ORDER, {
    message: {
        text: 'Your order was saved',
        className: 'alert alert-success'
    },
    items: []
});

export const addToOrder = ({book, count}) => setEventData(actions.ADD_TO_ORDER, {book, count});

export const addOneToOrder = book => setEventData(actions.ADD_ONE_TO_ORDER, book);

export const removeOrderMessage = () => setEventData(actions.REMOVE_ORDER_MESSAGE, removeMessage());

export const removeOrderItem = book => setEventData(actions.REMOVE_ORDER_ITEM, book);

export const showOrderErrorMessage = () => dangerAction("The order can not be made");