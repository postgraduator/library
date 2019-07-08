import PropTypes from "prop-types";
import {Component, Fragment} from "react";
import {connect} from "react-redux";
import {rest} from "../context";
import {fetchAllPermissions} from "../store/actions/permission-actions";
import {removeUserMessage} from "../store/actions/user-actions";
import {CommonAlert} from "./alerts/alert";
import {DeleteUserModal, UpdatePermissionModal} from "./modals/user-modal";
import UserEditorTable from "./tables/UserEditorTable";

class Users extends Component {
    render() {
        const {message} = this.props;
        return <Fragment>
            <CommonAlert text={message.text} className={message.className}/>
            <DeleteUserModal/>
            <UpdatePermissionModal/>
            <div className="container">
                <UserEditorTable/>
            </div>
        </Fragment>
    }

    componentDidMount() {
        const {removeModalMessage, message, fetchPermissions} = this.props;
        _.isEmpty(message) || removeModalMessage();
        fetchPermissions();
    }
}

Users.propTypes = {
    message: PropTypes.object,
    removeModalMessage: PropTypes.func.isRequired,
    fetchPermissions: PropTypes.func.isRequired
};

export default connect(({users}) => ({
    message: _.get(users, 'message', {})
}), dispatch => ({
    removeModalMessage: () => dispatch(removeUserMessage()),
    fetchPermissions: () => rest.permission.getAll()
        .then(({data}) => dispatch(fetchAllPermissions(data)))
}))(Users);