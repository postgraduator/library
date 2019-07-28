import {actions} from "../constants/order-constants";
import {setEventData} from "../utils/helper";
import {removeMessage} from "./common-actions";

export const makeOrder = () => setEventData(actions.MAKE_ORDER, {
    message: {
        text: 'Your order was saved',
        className: 'alert alert-success'
    },
    items: []
});

export const addToOrder = formData => setEventData(actions.ADD_TO_ORDER, formData);

export const addOneToOrder = book => setEventData(actions.ADD_ONE_TO_ORDER, book);

export const removeOrderMessage = () => setEventData(actions.REMOVE_ORDER_MESSAGE, removeMessage());

export const removeOrderItem = book => setEventData(actions.REMOVE_ORDER_ITEM, book);

export const clearCart = () => setEventData(actions.CLEAR_SHOPPING_CART, {items: []});