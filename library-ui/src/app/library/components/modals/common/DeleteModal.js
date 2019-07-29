import PropTypes from "prop-types";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {hideModal, showModalMessage} from "../../../store/actions/modal-actions";
import {DangerAlert} from "../../alerts/alert";
import {LightButton, PrimaryButton} from "../../buttons/action-launcher";

const DeleteModal = ({modalId, text, show, hideModal, action, data, errorMessage}) => (
    <Modal id={modalId} show={show} onHide={hideModal} size="sm" centered>
        <Modal.Header closeButton/>
        <Modal.Body>
            <DangerAlert text={errorMessage.text}/>
            {text}
        </Modal.Body>
        <Modal.Footer>
            <PrimaryButton title={'Delete'} launcher={() => action(data)}/>
            <LightButton title={'Cancel'} launcher={hideModal}/>
        </Modal.Footer>
    </Modal>);

DeleteModal.propTypes = {
    modalId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    errorMessage: PropTypes.object
};


const ReduxDeleteModal = connect(({modal}, {modalId, createText}) => ({
        modalId,
        show: _.get(modal, `${modalId}.opened`, false),
        data: _.get(modal, `${modalId}.data`),
        text: createText(_.get(modal, `${modalId}.data`, {})),
        errorMessage: _.get(modal, `${modalId}.message`, {})
    }),
    (dispatch, {modalId, action, serverAction}) => {
        const successProcessor = book => {
            dispatch(hideModal(modalId));
            dispatch(action(book));
        };
        const errorProcessor = () => dispatch(showModalMessage(modalId, {
            text: 'An unexpected error occurred'
        }));
        return {
            hideModal: () => dispatch(hideModal(modalId)),
            action: data => serverAction(data)
                .then(successProcessor)
                .catch(errorProcessor),
            removeModalMessage: () => dispatch(removeModalMessage(modalId))
        };
    })(DeleteModal);

ReduxDeleteModal.propTypes = {
    modalId: PropTypes.string.isRequired,
    createText: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
    serverAction: PropTypes.func.isRequired
};

export default ReduxDeleteModal;