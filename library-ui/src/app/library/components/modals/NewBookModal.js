import PropTypes from "prop-types";
import {Modal} from "react-bootstrap";
import {bindDispa, connect} from "react-redux";
import {addNewBook, removeBookMessage} from "../../store/actions/book-actions";
import {hideModal} from "../../store/actions/modal-actions";
import NewBookForm from "../forms/NewBookForm";
import {MODAL_IDS} from "./modal-ids";

const NewBookModal = ({modalId, show, hideModal}) => (<Modal id={modalId} size="lg" show={show} onHide={hideModal}>
    <Modal.Header closeButton>
        <Modal.Title>Add New Book</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <NewBookForm hideModal={book => hideModal(book)}/>
    </Modal.Body>
</Modal>);

NewBookModal.propTypes = {
    modalId: PropTypes.string.isRequired,
    show: PropTypes.bool,
    hideModal: PropTypes.func.isRequired
};

export default connect(
    ({modal}) => (
        {
            modalId: MODAL_IDS.NEW_BOOK_MODAL,
            show: _.get(modal, MODAL_IDS.NEW_BOOK_MODAL + '.opened')
        }),
    dispatch => ({
        hideModal: book => {
            dispatch(hideModal(MODAL_IDS.NEW_BOOK_MODAL));
            book ? dispatch(addNewBook(book)) : dispatch(removeBookMessage());
        }
    }))(NewBookModal);



