import PropTypes from "prop-types";
import {Component, Fragment} from "react";
import {connect} from "react-redux";
import {removeBookMessage} from "../store/actions/book-actions";
import {showModal} from "../store/actions/modal-actions";
import {MODAL_IDS} from "./modals/modal-ids";
import NewBookModal from "./modals/NewBookModal";

class BookEditorList extends Component{
    render() {
        const {showNewBookModal, message} = this.props;
        return <Fragment>
            {_.isEmpty(message) || <div className={message.className}>{message.text}</div>}
            <button type="button" className="btn btn-primary" onClick={showNewBookModal}>Add New Book</button>
            <NewBookModal/>
            <div className="container">
                Book Editor
            </div>
        </Fragment>
    }
    componentWillUnmount() {
        const {removeModalMessage, message} = this.props;
        _.isEmpty(message) || removeModalMessage();
    }
}

BookEditorList.propTypes = {
    showNewBookModal: PropTypes.func.isRequired,
    removeModalMessage: PropTypes.func.isRequired,
    message: PropTypes.object
};

export default connect(({books}) => ({message: books.message}), dispatch => ({
    showNewBookModal: () => dispatch(showModal(MODAL_IDS.NEW_BOOK_MODAL)),
    removeModalMessage: () => dispatch(removeBookMessage())
}))(BookEditorList);