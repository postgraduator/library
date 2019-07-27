import PropTypes from "prop-types";
import {rest} from "../../context";
import {makeOrder, removeOrderMessage} from "../../store/actions/order-actions";
import OrderForm from "../forms/OrderForm";
import ReduxFormModal from "./common/FormModal"
import {MODAL_IDS} from "./common/modal-ids";

const OrderModal =  ({addToOrder, removeItem, user}) => <ReduxFormModal modalId={MODAL_IDS.ORDER_MODAL}
                                                 createTitle={() => 'Current order'}
                                                 buttonTitle={'Order'}
                                                 action={makeOrder}
                                                 serverAction={values => rest.order.makeOrder(user, values)}
                                                 removeMessage={removeOrderMessage}
                                                 formDataCollector={({order}) => ({...order})}
                                                 ActionForm={({applyChanges, formSubmitter, data}) => <OrderForm
                                                     makeOrder={applyChanges}
                                                     formSubmitter={formSubmitter}
                                                     orderedBooks={_.get(data, 'items', [])}
                                                     addToOrder={addToOrder}
                                                     removeItem={removeItem}/>}/>;

OrderModal.propTypes = {
    addToOrder: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    removeItem: PropTypes.func.isRequired
};

export default OrderModal;