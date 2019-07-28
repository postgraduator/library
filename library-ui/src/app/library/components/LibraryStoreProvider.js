import {Component} from "react";
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {rest} from "../context";
import {fetchUser} from "../store/actions/current-user-actions";
import {availableBooks, books} from "../store/reducers/book-reducers";
import {current} from "../store/reducers/current-user-reducers";
import {genders} from "../store/reducers/gender-reducers";
import {modal} from "../store/reducers/modal-reducers";
import {orderInfo} from "../store/reducers/order-info-reducer";
import {order} from "../store/reducers/order-reducers";
import {permissions} from "../store/reducers/permission-reducer";
import {users} from "../store/reducers/user-reducers";
import {initState} from "../store/utils/helper";

export default class LibraryStoreProvider extends Component {
    constructor(props) {
        super(props);
        this.fetchCurrentUser = () => rest.user.fetchCurrentUser();
        this.reduxStore = createStore(
            combineReducers({users, modal, books, permissions, genders, current, order, availableBooks, orderInfo})
        );
    }

    componentDidMount() {
        initState([{action: fetchUser, restAction: this.fetchCurrentUser}], this.reduxStore.dispatch.bind(this.reduxStore));
    }

    render() {
        return (<Provider store={this.reduxStore}>
            {this.props.children}
        </Provider>)
    }
}