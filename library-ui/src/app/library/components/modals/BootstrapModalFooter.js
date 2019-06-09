import PropTypes from "prop-types";
import {Modal} from "react-bootstrap";

const BootstrapModalFooter = ({closeModalTitle = 'Close', saveModalTitle, saveModal, hideModal}) => (<Modal.Footer>
    <div className="float-right">
        <button type="button" className="btn btn-primary" onClick={saveModal}>{saveModalTitle}</button>
        <button type="button" className="btn btn-light" onClick={hideModal}>{closeModalTitle}</button>
    </div>
</Modal.Footer>);

BootstrapModalFooter.propTypes = {
    closeModalTitle: PropTypes.string,
    saveModalTitle: PropTypes.string.isRequired,
    saveModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired
};

export default BootstrapModalFooter;