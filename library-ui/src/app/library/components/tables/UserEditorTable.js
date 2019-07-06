import format from "date-fns/format";
import {Fragment} from "react";
import {connect} from "react-redux";
import {rest} from "../../context";
import {showModal} from "../../store/actions/modal-actions";
import {getUsers, showUserErrorMessage} from "../../store/actions/user-actions";
import {OutlineDangerButton} from "../buttons/ActionLauncher";
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

export default connect(({users}) => ({
        data: _.get(users, 'items', []),
        pagination: _.get(users, 'pagination', {number: 0}),
        refreshed: _.get(users, 'refreshed', false),
        columns: [{
            field: 'name',
            header: 'Name',
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
            width: '10%',
            Component: ({item}) => (<Fragment>
                {item.birthday && format(item.birthday, 'MM/DD/YYYY')}
            </Fragment>)
        }, {
            field: 'crud',
            header: null,
            width: '20%',
            Component: ({item}) => (<DeleteUserButton user={item}/>)
        }]
    }),
    dispatch => ({
        pageFetcher: ({page}) => rest.user.getUsers({page, sort: 'name'})
            .then(({data, pagination}) => dispatch(getUsers({users: data, pagination})))
            .catch(({message}) => dispatch(showUserErrorMessage(message)))
    }))(Table);