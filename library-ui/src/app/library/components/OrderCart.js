import PropTypes from "prop-types";
import {connect} from "react-redux";
import {showModal} from "../store/actions/modal-actions";
import {MODAL_IDS} from "./modals/modal-ids";

const OrderCart = ({orderCount, showCart}) => (<button type="button" className="btn btn-info" onClick={showCart}>
    Order <span className="badge badge-light">{orderCount}</span>
</button>);

OrderCart.propTypes = {
    orderCount: PropTypes.number,
    showCart: PropTypes.func.isRequired
};

export default connect(
    ({order}) => ({
        orderCount: _.get(order, 'items', []).length
    }),
    dispatch => ({
        showCart: () => dispatch(showModal(MODAL_IDS.ORDER_MODAL))
    }))(OrderCart);

