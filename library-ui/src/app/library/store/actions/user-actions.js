import {actions} from "../constants/user-constants";
import {setEventData} from "../utils/helper";
import {dangerAction, fetchAction, removeMessage, successCrudAction, warningCrudAction} from "./common-actions";

export const getUsers = ({data, pagination, sort, filters}) =>
    setEventData(actions.GET_PAGE_OF_USERS, fetchAction(data, pagination, sort, filters));

export const showUserErrorMessage = text => setEventData(actions.SHOW_USER_ERROR_MESSAGE, dangerAction(text));

export const removeUserMessage = () => setEventData(actions.REMOVE_USER_MESSAGE, removeMessage());

export const deleteUser = user => setEventData(actions.DELETE_USER, warningCrudAction(`The user '${user.name}' was deleted.`));

export const updateUserPermission = user => setEventData(actions.UPDATE_USER_PERMISSION, successCrudAction(`The permission of '${user.name}' was changed.`));

export const getUserById = user => setEventData(actions.GET_USER_BY_ID, user);