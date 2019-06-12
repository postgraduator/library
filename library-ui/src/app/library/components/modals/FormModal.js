import PropTypes from "prop-types";
import {Modal} from "react-bootstrap";

const FormModal = ({modalId, show, ActionForm, hideModal, saveModalTitle, closeModalTitle = 'Close'}) => {
    let submitForm = data => data;
    return <Modal id={modalId} size="lg" show={show} onHide={hideModal}>
        <Modal.Header closeButton>
            <Modal.Title>Add New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ActionForm formSubmitter={submitter => submitForm = submitter}/>
        </Modal.Body>
        <Modal.Footer>
            <div className="float-right">
                <button type="button" className="btn btn-primary" onClick={() => submitForm()}>{saveModalTitle}</button>
                <button type="button" className="btn btn-light" onClick={() => hideModal()}>{closeModalTitle}</button>
            </div>
        </Modal.Footer>
    </Modal>
};

FormModal.propTypes = {
    closeModalTitle: PropTypes.string,
    saveModalTitle: PropTypes.string.isRequired,
    ActionForm: PropTypes.elementType.isRequired,
    hideModal: PropTypes.func.isRequired
};

export default FormModal;