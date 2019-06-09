import {Component} from "react";
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {rest} from "../context";
import {fetchUser} from "../store/actions/user-actions";
import {modal} from "../store/reducers/modal-reducers";
import {user} from "../store/reducers/user-reducers";
import {initState} from "../store/utils/helper";

export default class LibraryStoreProvider extends Component {
    constructor(props) {
        super(props);
        this.fetchCurrentUser = () => rest.user.fetchCurrentUser();
        this.reduxStore = createStore(
            combineReducers({user, modal})
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