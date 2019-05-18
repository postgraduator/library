import {Component} from "react";
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {fetchCurrentUser} from "../rest/users";
import {fetchUser} from "../store/actions/user-actions";
import {user} from "../store/reducers/user-reducers";
import {initState} from "../store/utils/helper";

export default class LibraryStoreProvider extends Component {
    constructor(props) {
        super(props);
        this.reduxStore = createStore(combineReducers({user}));
    }
    componentWillMount() {
        initState([{action: fetchUser, restAction: fetchCurrentUser}], this.reduxStore.dispatch.bind(this.reduxStore));
    }

    render() {
        return (<Provider store={this.reduxStore}>
            {this.props.children}
        </Provider>)
    }
}