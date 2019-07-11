import format from "date-fns/format";
import {Fragment} from "react";
import {connect} from "react-redux";
import {rest} from "../../context";
import {showModal} from "../../store/actions/modal-actions";
import {getUsers, showUserErrorMessage} from "../../store/actions/user-actions";
import {OutlineDangerButton, OutlineSecondaryButton} from "../buttons/action-launcher";
import {MODAL_IDS} from "../modals/common/modal-ids";
import Table from "./common/Table";

const DeleteUserButton = connect(
    ({users}, {user}) => ({
        visible: _.get(users, 'current.name') !== user.name
    }),
    (dispatch, {user}) => ({
        launcher: () => dispatch(showModal(MODAL_IDS.DELETE_USER_MODAL, user))
    }))(({launcher, visible}) => (
    <Fragment>
        {visible && <OutlineDangerButton title={'Delete'} launcher={launcher}/>}
    </Fragment>));

const UpdatePermissionButton = connect(null,
    (dispatch, {user}) => ({
        launcher: () => dispatch(showModal(MODAL_IDS.UPDATE_PERMISSION_MODAL, user))
    }))(({launcher}) => <OutlineSecondaryButton title={'Update'} launcher={launcher}/>);

export default connect(({users}) => ({
        data: _.get(users, 'items', []),
        pagination: _.get(users, 'pagination', {number: 0}),
        sort: _.get(users, 'sort', {}),
        filters: _.get(users, 'filters', {}),
        columns: [{
            field: 'name',
            header: 'Name',
            filterable: true,
            sortable: true,
            width: '20%'
        }, {
            field: 'email',
            header: 'Email',
            width: '20%'
        }, {
            field: 'gender',
            header: 'Gender',
            width: '5%',
            Component: ({item}) => (<Fragment>
                {item.gender && item.gender.substring(0, 1)}
            </Fragment>)
        }, {
            field: 'birthday',
            header: 'Birthday',
            width: '10%'
        }, {
            field: 'permission.name',
            header: 'Permission',
            width: '5%'
        }, {
            field: 'crud',
            header: null,
            width: '20%',
            Component: ({item}) => (<Fragment>
                <UpdatePermissionButton user={item}/>
                <DeleteUserButton user={item}/>
            </Fragment>)
        }]
    }),
    dispatch => ({
        pageFetcher: params => rest.user.getUsers(params)
            .catch(({message}) => dispatch(showUserErrorMessage(message))),
        setStateData: props => dispatch(getUsers(props))
    }))(Table);