import {actions} from "../constants/order-info-constants";
import {setEventData} from "../utils/helper";
import {dangerAction, fetchAction, removeMessage} from "./common-actions";

export const getOrderInfoPage = ({data, pagination, sort, filters, userId}) => setEventData(
    actions.GET_USER_ORDER_INFO,
    {...fetchAction(data, pagination, sort, filters), userId}
);

export const showOrderInfoErrorMessage = text => setEventData(actions.SHOW_ORDER_INFO_ERROR_MESSAGE, dangerAction(text));

export const removeOrderInfoMessage = () => setEventData(actions.REMOVE_ORDER_INFO_MESSAGE, removeMessage());