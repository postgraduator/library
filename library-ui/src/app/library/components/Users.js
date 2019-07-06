import {Component, Fragment} from "react";
import {connect} from "react-redux";
import {removeUserMessage} from "../store/actions/user-actions";
import {CommonAlert} from "./alerts/Alert";
import {DeleteUserModal} from "./modals/UserModal";
import UserEditorTable from "./tables/UserEditorTable";

class Users extends Component {
    render() {
        const {message} = this.props;
        return <Fragment>
            <CommonAlert text={message.text} className={message.className}/>
            <DeleteUserModal/>
            <div className="container">
                <UserEditorTable/>
            </div>
        </Fragment>
    }

    componentDidMount() {
        const {removeModalMessage, message} = this.props;
        _.isEmpty(message) || removeModalMessage();
    }
}

export default connect(({users}) => ({
    message: _.get(users, 'message', {})
}), dispatch => ({
    removeModalMessage: () => dispatch(removeUserMessage())
}))(Users);