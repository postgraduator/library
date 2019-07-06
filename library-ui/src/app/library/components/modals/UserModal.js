import {rest} from "../../context";
import {deleteUser} from "../../store/actions/user-actions";
import ReduxDeleteModal from "./common/DeleteModal";
import {MODAL_IDS} from "./common/modal-ids";

export const DeleteUserModal = () => (<ReduxDeleteModal modalId={MODAL_IDS.DELETE_USER_MODAL}
                                                        createText={({name}) => `User '${name}' will be removed. Enter Delete button to proceed`}
                                                        action={deleteUser}
                                                        serverAction={user => rest.user.deleteUser(user)}/>);