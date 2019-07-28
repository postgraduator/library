import {Fragment} from "react";
import {connect} from "react-redux";
import {HashRouter} from "react-router-dom";
import {refreshBookPage} from "../store/actions/book-actions";
import {addToOrder, clearCart, removeOrderItem} from "../store/actions/order-actions";
import {CommonAlert} from "./alerts/alert";
import OrderModal from "./modals/OrderModal"
import OrderCart from "./OrderCart";
import {Menu, RouterMain} from "./router-menu";
import SignupButton from "./SignupButton";

const LibraryMainPage = ({user, orderMessage, addToOrder, removeItem, afterOrderCallback}) => (<Fragment>
    <header>
        <div className="container">
            <nav className="navbar navbar-light bg-light ustify-content-between">
                <span className="navbar-brand mb-0 h1">Hello {user.name}</span>
                <div className="inline-child-element">
                    <OrderCart/>
                    <SignupButton/>
                </div>
            </nav>
        </div>
    </header>
    <main>
        <OrderModal addToOrder={addToOrder} user={user} removeItem={removeItem} afterOrderCallback={afterOrderCallback}/>
        <div className="container">
            <div className="row">
                <HashRouter>
                    <div className="col-sm-2">
                        <Menu/>
                    </div>
                    <div className="col-sm-10">
                        <CommonAlert text={orderMessage.text} className={orderMessage.className}/>
                        <RouterMain/>
                    </div>
                </HashRouter>
            </div>
        </div>
    </main>
</Fragment>);

export default connect(
    ({current, order}) => ({
        user: {...current.user},
        orderMessage: _.get(order, 'message', {})
    }),
    dispatch => ({
        addToOrder: item => dispatch(addToOrder(item)),
        removeItem: book => dispatch(removeOrderItem(book)),
        afterOrderCallback: () => {
            dispatch(clearCart());
            dispatch(refreshBookPage());
        }
    })
)(LibraryMainPage);