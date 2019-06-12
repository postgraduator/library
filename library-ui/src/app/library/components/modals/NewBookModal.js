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
            saveModalTitle: 'Save book'
        }),
    dispatch => {
        const successSubmit = (book) => {
            dispatch(hideModal(MODAL_IDS.NEW_BOOK_MODAL));
            dispatch(addNewBook(book));
        };
        return {
            hideModal: () => {
                dispatch(hideModal(MODAL_IDS.NEW_BOOK_MODAL));
                dispatch(removeBookMessage());
            },
            ActionForm: ({formSubmitter}) => (<NewBookForm formSubmitter={formSubmitter} successSubmit={successSubmit}/>)
        }
    })(FormModal);



