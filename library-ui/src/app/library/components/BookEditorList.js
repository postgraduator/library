import PropTypes from "prop-types";
import {Component, Fragment} from "react";
import {connect} from "react-redux";
import {removeBookMessage} from "../store/actions/book-actions";
import {showModal} from "../store/actions/modal-actions";
import {CommonAlert} from "./alerts/alert";
import {SecondaryButton} from "./buttons/action-launcher";
import {DeleteBookModal, NewBookModal, UpdateBookModal} from "./modals/book-modal";
import {MODAL_IDS} from "./modals/modal-ids";
import BookEditorTable from "./tables/BookEditorTable";

class BookEditorList extends Component {
    render() {
        const {showNewBookModal, message} = this.props;
        return <Fragment>
            <CommonAlert text={message.text} className={message.className}/>
            <SecondaryButton title={'Add New Book'} launcher={showNewBookModal}/>
            <NewBookModal/>
            <UpdateBookModal/>
            <DeleteBookModal/>
            <div className="container">
                <BookEditorTable/>
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
    showNewBookModal: () => dispatch(showModal(MODAL_IDS.NEW_BOOK_MODAL, {
        name: '',
        count: 1,
        price: ''
    })),
    removeModalMessage: () => dispatch(removeBookMessage())
}))(BookEditorList);