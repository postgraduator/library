import PropTypes from "prop-types";
import {Fragment} from "react";
import {connect} from "react-redux";
import {showModal} from "../store/actions/modal-actions";
import {MODAL_IDS} from "./modals/modal-ids";
import NewBookModal from "./modals/NewBookModal";

const BookEditorList = ({showNewBookModal}) => (
    <Fragment>
        <button type="button" className="btn btn-primary" onClick={showNewBookModal}>Add New Book</button>
        <NewBookModal/>
        <div className="container">
            Book Editor
        </div>
    </Fragment>
);

BookEditorList.propTypes = {
    showNewBookModal: PropTypes.func.isRequired
};

export default connect(null, dispatch => ({
    showNewBookModal: () => dispatch(showModal(MODAL_IDS.NEW_BOOK_MODAL))
}))(BookEditorList);