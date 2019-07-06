import PropTypes from "prop-types";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {hideModal} from "../../../store/actions/modal-actions";
import {DangerAlert} from "../../alerts/Alert";
import {LightButton, PrimaryButton} from "../../buttons/ActionLauncher";

const DeleteModal = ({modalId, text, show, hideModal, action, data}) => {
    let errorMessage = '';
    return <Modal id={modalId} show={show} size="sm" centered>
        <Modal.Header closeButton/>
        <Modal.Body>
            <DangerAlert text={errorMessage}/>
            {text}
        </Modal.Body>
        <Modal.Footer>
            <PrimaryButton title={'Delete'} launcher={() => action(data).catch(({message}) => errorMessage = message || 'An unexpected server error occured.')}/>
            <LightButton title={'Cancel'} launcher={hideModal}/>
        </Modal.Footer>
    </Modal>
};

DeleteModal.propTypes = {
    modalId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};


const ReduxDeleteModal = connect(({modal}, {modalId, createText}) => ({
        modalId,
        show: _.get(modal, `${modalId}.opened`, false),
        data: _.get(modal, `${modalId}.data`),
        text: createText(_.get(modal, `${modalId}.data`, {}))
    }),
    (dispatch, {modalId, action, serverAction}) => {
        const successProcessor = book => {
            dispatch(hideModal(modalId));
            dispatch(action(book));
        };
        return {
            hideModal: () => dispatch(hideModal(modalId)),
            action: data => serverAction(data)
                .then(successProcessor)
        };
    })(DeleteModal);

ReduxDeleteModal.propTypes = {
    modalId: PropTypes.string.isRequired,
    createText: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
    serverAction: PropTypes.func.isRequired
};

export default ReduxDeleteModal;