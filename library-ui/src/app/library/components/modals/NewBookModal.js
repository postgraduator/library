import PropTypes from "prop-types";
import {Modal} from "react-bootstrap";
import {bindDispa, connect} from "react-redux";
import {hideModal} from "../../store/actions/modal-actions";
import NewBookForm from "../forms/NewBookForm";
import {MODAL_IDS} from "./modal-ids";

const NewBookModal = ({modalId, show, hideModal, saveModal}) => (<Modal id={modalId} size="lg" show={show} onHide={hideModal}>
    <Modal.Header closeButton>
        <Modal.Title>Add New Book</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <NewBookForm/>
    </Modal.Body>
    <Modal.Footer>
        <div className="float-right">
            <button type="button" className="btn btn-primary" onClick={saveModal}>Save Book</button>
            <button type="button" className="btn btn-light" onClick={hideModal}>Close</button>
        </div>
    </Modal.Footer>
</Modal>);

NewBookModal.propTypes = {
    modalId: PropTypes.string.isRequired,
    show: PropTypes.bool,
    saveModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired
};

export default connect(
    ({modal}) => (
        {
            modalId: MODAL_IDS.NEW_BOOK_MODAL,
            show: _.get(modal, MODAL_IDS.NEW_BOOK_MODAL + '.opened')
        }),
    dispatch => ({
        saveModal: (data) => data,
        hideModal: () => dispatch(hideModal(MODAL_IDS.NEW_BOOK_MODAL))
    }))(NewBookModal);



