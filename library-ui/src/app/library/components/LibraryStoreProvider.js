import {Component} from "react";
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {getServerInfoContext} from "../../common/utils/server-info";
import {LIBRARY_APP_ID} from "../context";
import {fetchCurrentUser} from "../rest/users";
import {fetchUser} from "../store/actions/user-actions";
import {user} from "../store/reducers/user-reducers";
import {initState} from "../store/utils/helper";

export default class LibraryStoreProvider extends Component {
    constructor(props) {
        super(props);
        this.reduxStore = createStore(
            combineReducers({user, serverContext: (state = {}) => state}),
            {serverContext: getServerInfoContext(LIBRARY_APP_ID)}
        );
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