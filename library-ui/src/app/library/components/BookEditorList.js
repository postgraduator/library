import PropTypes from "prop-types";
import {Component, Fragment} from "react";
import {connect} from "react-redux";
import {removeBookMessage} from "../store/actions/book-actions";
import {showModal} from "../store/actions/modal-actions";
import {NewBookModal, UpdateBookModal} from "./modals/BookModal";
import {MODAL_IDS} from "./modals/common/modal-ids";
import BookEditorTable from "./tables/BookEditorTable";
import {AddModalLauncher} from "./tables/buttons/ModalLauncher";

class BookEditorList extends Component {
    render() {
        const {showNewBookModal, message} = this.props;
        return <Fragment>
            {_.isEmpty(message) || <div className={message.className}>{message.text}</div>}
            <AddModalLauncher title={'Add New Book'} launcher={showNewBookModal}/>
            <NewBookModal/>
            <UpdateBookModal/>
            <div className="container">
                <BookEditorTable/>
            </div>
        </Fragment>
    }

    componentWillUnmount() {
        const {removeModalMessage, message} = this.props;
        _.isEmpty(message) || removeModalMessage();
    }
}

BookEditorList.propTypes = {
    showNewBookModal: PropTypes.func.isRequired,
    removeModalMessage: PropTypes.func.isRequired,
    message: PropTypes.object
};

export default connect(({books}) => ({message: books.message}), dispatch => ({
    showNewBookModal: () => dispatch(showModal(MODAL_IDS.NEW_BOOK_MODAL, {
        name: '',
        count: 1,
        price: ''
    })),
    removeModalMessage: () => dispatch(removeBookMessage())
}))(BookEditorList);