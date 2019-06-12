import {bindDispa, connect} from "react-redux";
import {addNewBook, removeBookMessage} from "../../store/actions/book-actions";
import {hideModal} from "../../store/actions/modal-actions";
import NewBookForm from "../forms/NewBookForm";
import FormModal from "./FormModal";
import {MODAL_IDS} from "./modal-ids";

export default connect(
    ({modal}) => (
        {
            modalId: MODAL_IDS.NEW_BOOK_MODAL,
            show: _.get(modal, MODAL_IDS.NEW_BOOK_MODAL + '.opened'),
            ActionForm: NewBookForm,
            saveModalTitle: 'Save book'
        }),
    dispatch => ({
        hideModal: book => {
            dispatch(hideModal(MODAL_IDS.NEW_BOOK_MODAL));
            book ? dispatch(addNewBook(book)) : dispatch(removeBookMessage());
        }
    }))(FormModal);



