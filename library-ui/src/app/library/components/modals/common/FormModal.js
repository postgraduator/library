import PropTypes from "prop-types";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {hideModal, showModalMessage} from "../../../store/actions/modal-actions";
import {DangerAlert} from "../../alerts/alert";
import {LightButton, PrimaryButton} from "../../buttons/action-launcher";

const FormModal = ({modalId, title, show, initialValues, ActionForm, hideModal, saveModalTitle, data, closeModalTitle = 'Close'}, errorMessage) => {
    let submitForm = data => data;
    const formSubmitter = submitter => submitForm = submitter;
    return <Modal id={modalId} size="lg" show={show} onHide={hideModal}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <DangerAlert text={errorMessage.text}/>
            <ActionForm formSubmitter={formSubmitter} initialValues={initialValues} data={data}/>
        </Modal.Body>
        <Modal.Footer>
            <div className="float-right">
                <PrimaryButton title={saveModalTitle} launcher={() => submitForm()}/>
                <LightButton title={closeModalTitle} launcher={() => hideModal()}/>
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
    title: PropTypes.string,
    data: PropTypes.object,
    errorMessage: PropTypes.object
};

const ReduxFormModal = connect(
    (state, {buttonTitle, modalId, createTitle, formDataCollector}) => {
        const {modal} = state;
        const modalData = _.get(modal, modalId + '.data', {});
        return {
            modalId,
            data: _.isFunction(formDataCollector) ? formDataCollector(state) : {},
            title: createTitle(modalData),
            show: _.get(modal, modalId + '.opened'),
            initialValues: modalData,
            saveModalTitle: buttonTitle,
            errorMessage: _.get(modal, `${modalId}.message`, {})
        }
    },
    (dispatch, {action, serverAction, removeMessage, modalId, ActionForm}) => {
        const successSubmit = data => {
            dispatch(hideModal(modalId));
            dispatch(action(data));
        };
        const errorProcessor = () => dispatch(showModalMessage(modalId, {
            text: 'An unexpected error occurred.'
        }));
        return {
            hideModal: () => {
                dispatch(hideModal(modalId));
                dispatch(removeMessage());
            },
            ActionForm: ({formSubmitter, initialValues, data}) => (<ActionForm formSubmitter={formSubmitter}
                                                                               initialValues={initialValues}
                                                                               data={data}
                                                                               applyChanges={values => serverAction(values)
                                                                                   .then(({data}) => successSubmit(data))
                                                                                   .catch(errorProcessor)}/>)
        }
    })(FormModal);

ReduxFormModal.propTypes = {
    modalId: PropTypes.string.isRequired,
    createTitle: PropTypes.func.isRequired,
    buttonTitle: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    serverAction: PropTypes.func.isRequired,
    removeMessage: PropTypes.func.isRequired,
    ActionForm: PropTypes.elementType.isRequired,
    formDataCollector: PropTypes.func
};

export default ReduxFormModal;