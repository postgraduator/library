import {Fragment} from "react";
import {connect} from "react-redux";
import {rest} from "../../context";
import {getUsers, showUserErrorMessage} from "../../store/actions/user-actions";
import Table from "./common/Table";

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
            width: '10%'
        }]
    }),
    dispatch => ({
        pageFetcher: ({page}) => rest.user.getUsers({page, sort: 'name'})
            .then(({data, pagination}) => dispatch(getUsers({users: data, pagination})))
            .catch(({message}) => dispatch(showUserErrorMessage(message)))
    }))(Table);