import PropTypes from "prop-types";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {hideModal} from "../../store/actions/modal-actions";

const FormModal = ({modalId, title, show, initialValues, ActionForm, hideModal, saveModalTitle, closeModalTitle = 'Close'}) => {
    let submitForm = data => data;
    return <Modal id={modalId} size="lg" show={show} onHide={hideModal}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ActionForm formSubmitter={submitter => submitForm = submitter} initialValues={initialValues}/>
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
    hideModal: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
    title: PropTypes.string
};

const ReduxFormModal = connect(
    ({modal}, {buttonTitle, modalId, createTitle}) => {
        const modalData = _.get(modal, modalId + '.data', {});
        return {
            modalId,
            title: createTitle(modalData),
            show: _.get(modal, modalId + '.opened'),
            initialValues: modalData,
            saveModalTitle: buttonTitle
        }
    },
    (dispatch, {action, serverAction, removeMessage, modalId, ActionForm}) => {
        const successSubmit = (book) => {
            dispatch(hideModal(modalId));
            dispatch(action(book));
            rest.book.getBooks()
        };
        return {
            hideModal: () => {
                dispatch(hideModal(modalId));
                dispatch(removeMessage());
            },
            ActionForm: ({formSubmitter, initialValues}) => (<ActionForm formSubmitter={formSubmitter}
                                                                       initialValues={initialValues}
                                                                       applyChanges={values => serverAction(values)
                                                                           .then(({data}) => successSubmit(data))}/>)
        }
    })(FormModal);

ReduxFormModal.propTypes = {
    modalId: PropTypes.string.isRequired,
    createTitle: PropTypes.func.isRequired,
    buttonTitle: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    serverAction: PropTypes.func.isRequired,
    removeMessage: PropTypes.func.isRequired,
    ActionForm: PropTypes.elementType.isRequired
};

export default ReduxFormModal;