import {Component, Fragment} from "react";
import {connect} from "react-redux";
import {removeOrderInfoMessage} from "../store/actions/order-info-actions";
import {CommonAlert} from "./alerts/alert";
import UserOrderInfoTable from "./tables/order-info-table/UserOrderInfoTable";

class Orders extends Component {
    componentWillUnmount() {
        const {removeMessage, message} = this.props;
        _.isEmpty(message) || removeMessage();
    }

    render() {
        const {message} = this.props;
        return <Fragment>
            <CommonAlert text={message.text} className={message.className}/>
            <UserOrderInfoTable/>
        </Fragment>
    }
}

export default connect(
    ({orderInfo}) => ({
        message: _.get(orderInfo, 'message', {})
    }), dispatch => ({
        removeMessage: () => dispatch(removeOrderInfoMessage())
    }))(Orders);