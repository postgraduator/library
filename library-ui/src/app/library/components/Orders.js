import {Component, Fragment} from "react";
import {connect} from "react-redux";
import {removeOrderInfoMessage} from "../store/actions/order-info-actions";
import {CommonAlert} from "./alerts/alert";
import OrderInfoTable from "./tables/OrderInfoTable";

class Orders extends Component {
    componentWillUnmount() {
        const {removeMessage, message} = this.props;
        _.isEmpty(message) || removeMessage();
    }

    render() {
        const {message} = this.props;
        return <Fragment>
            <CommonAlert text={message.text} className={message.className}/>
            <OrderInfoTable/>
        </Fragment>
    }
}

export default connect(
    ({orderInfo}) => ({
        message: _.get(orderInfo, 'message', {})
    }), dispatch => ({
        removeMessage: () => dispatch(removeOrderInfoMessage())
    }))(Orders);