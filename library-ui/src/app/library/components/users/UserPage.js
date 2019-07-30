import {Switch, Route} from "react-router-dom"
import {ROUTE_LIST} from "../../routes/configuration";
import {STATES} from "../../routes/states";

const UserPage = () => {
    const parentState = _.find(ROUTE_LIST, ['path', STATES.users]);
    const childStates = parentState ? parentState.children : [];
    return <Switch>
        {_.map(childStates, route => <Route key={route.path}
                                            exact={route.exact}
                                            path={route.path}
                                            component={route.component} />)}
    </Switch>
};

export default UserPage;