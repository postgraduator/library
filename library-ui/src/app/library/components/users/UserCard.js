import PropTypes from "prop-types";
import {Component} from "react";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {rest} from "../../context";
import {getUserById, showUserErrorMessage} from "../../store/actions/user-actions";
import {getUniqueKey} from "../../utils/data-utils";

class UserCard extends Component{
    componentDidMount() {
        const {user, fetchUser, userId} = this.props;
        _.isEmpty(user) && fetchUser(userId);
    }

    render() {
        const {user, path} = this.props;
        return <div className="card">
            <div className="card-body">
                <h5 className="card-title">User info</h5>
                <div className="card-body">
                    <p className="card-text">{user.name}</p>
                    <p className="card-text">{user.email}</p>
                    <Link to={path} className="card-link">Back to Users ></Link>
                </div>
            </div>
        </div>
    }
}

UserCard.defaultProps = {
    user: {},
    path: '/users'
};

UserCard.propTypes = {
    user: PropTypes.object,
    path: PropTypes.string,
    fetchUser: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired
};

export default withRouter(connect(
    ({users, userOrders}, {match}) => ({
        user: _.find(users.items, item => _.get(match, 'params.id') === getUniqueKey(item)),
        userId: _.get(match, 'params.id')
    }),
    dispatch => ({
        fetchUser: userId => rest.user.getUserById(userId)
            .then(({data}) => dispatch(getUserById(data)))
            .catch(() => dispatch(showUserErrorMessage('The can not be retrieved.')))
    }))(UserCard));
