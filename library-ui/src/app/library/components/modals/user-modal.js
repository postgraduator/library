import {rest} from "../../context";
import {deleteUser, removeUserMessage, updateUserPermission} from "../../store/actions/user-actions";
import UserPermissionForm from "../forms/UserPermissionForm";
import ReduxDeleteModal from "./common/DeleteModal";
import ReduxFormModal from "./common/FormModal";
import {MODAL_IDS} from "./modal-ids";

export const DeleteUserModal = () => (<ReduxDeleteModal modalId={MODAL_IDS.DELETE_USER_MODAL}
                                                        createText={({name}) => `User '${name}' will be removed. Enter Delete button to proceed`}
                                                        action={deleteUser}
                                                        serverAction={user => rest.user.deleteUser(user)}/>);

export const UpdatePermissionModal = () => (<ReduxFormModal modalId={MODAL_IDS.UPDATE_PERMISSION_MODAL}
                                                            action={updateUserPermission}
                                                            serverAction={data => rest.user.updatePermission(data)}
                                                            removeMessage={removeUserMessage}
                                                            ActionForm={UserPermissionForm}
                                                            buttonTitle={'Update permission'}
                                                            createTitle={({name}) => `Update permission for user '${name}'`}
                                                            formDataCollector={({permissions}) => ({permissions})}/>);