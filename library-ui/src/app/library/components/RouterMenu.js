import {Fragment} from "react";
import {connect} from "react-redux";
import {NavLink, Redirect, Route, Switch} from "react-router-dom";
import {ROOT_PATH, ROUTE_LIST} from "../routes/configuration";
import NotFoundPage from "./NotFoundPage";

const permissionFilter = (user) => (route) => {
    return _.isEmpty(route.permissions) || _.includes(route.permissions, _.get(user, 'permission.name'))
};

const MainMenu = ({user, routes}) => {
    const availableRoutes = _.isEmpty(user) ? [] : _.filter(routes, permissionFilter(user));
    return (<ul className="nav flex-column nav-pills bg-light">
        {_.map(availableRoutes, ( route) => (<li key={route.path} className="nav-item">
                <NavLink exact={route.exact} activeClassName="nav-link active" className="nav-link" to={route.path}>{route.name}</NavLink>
            </li>))
        }
    </ul>)
};

export const Menu = connect(({current}) => ({user: {...current.user}, routes: ROUTE_LIST}))(MainMenu);

const HashRouterMain = ({user, routes}) => {
    const availableRoutes = _.isEmpty(user) ? [] : _.filter(routes, permissionFilter(user));
    const defaultRoute = _.head(availableRoutes);
    const RedirectRoute = _.isEmpty(user) || _.find(availableRoutes, ['path', ROOT_PATH]) ?
        () => (<Fragment/>) :
        () => (<Route path={ROOT_PATH} exact render={() => (<Redirect from={ROOT_PATH} to={defaultRoute.path}/>)}/>);
    const NotFoundRoute = _.isEmpty(availableRoutes) ? () => (<Fragment/>) : NotFoundPage;
    return (<Switch>
        {
            _.map(availableRoutes, (route) => (<Route exact={route.exact}
                                                      key={route.path}
                                                      path={route.path}
                                                      component={route.component}/>))
        }
        <RedirectRoute/>
        <Route component={NotFoundRoute}/>
    </Switch>)
};

export const RouterMain = connect(({current}) => ({user: {...current.user}, routes: ROUTE_LIST}))(HashRouterMain);