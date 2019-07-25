import PropTypes from "prop-types";
import {Component, Fragment} from "react";
import {connect} from "react-redux";
import {removeBookMessage} from "../store/actions/book-actions";
import {CommonAlert} from "./alerts/alert";
import BookGrid from "./grids/BookGrid";

class Books extends Component {
    render() {
        const {message} = this.props;
        return <Fragment>
            <CommonAlert className={message.className} text={message.text}/>
            <BookGrid/>
        </Fragment>
    }
    componentWillUnmount() {
        const {message, removeMessage} = this.props;
        _.isEmpty(message) || removeMessage();
    }
}

Books.propTypes = {
    message: PropTypes.object,
    removeMessage: PropTypes.func.isRequired
};

export default connect(
    ({availableBooks}) => ({
        message: _.get(availableBooks, 'message', {})
    }),
    dispatch => ({
        removeMessage: () => dispatch(removeBookMessage())
    }))(Books);