import {connect} from "react-redux";
import {rest} from "../../context";
import {getBooks, showBookErrorMessage} from "../../store/actions/book-actions";
import {showModal} from "../../store/actions/modal-actions";
import {MODAL_IDS} from "../modals/common/modal-ids";
import {UpdateModalLauncher} from "./buttons/ModalLauncher";
import Table from "./common/Table";

const UpdateBookModalLauncher = connect(null, (dispatch, {book}) => ({
    launcher: () => dispatch(showModal(MODAL_IDS.UPDATE_BOOK_MODAL, book))
}))(({launcher}) => (<UpdateModalLauncher launcher={launcher} title={'Update book'}/>));

export default connect(({books}) => ({
        data: _.get(books, 'items', []),
        pagination: _.get(books, 'pagination', {number: 0}),
        refreshed: _.get(books, 'refreshed', false),
        columns: [{
            field: 'name',
            header: 'Name',
            width: '60%'
        }, {
            field: 'price',
            header: 'Price',
            width: '15%'
        }, {
            field: 'count',
            header: 'Count',
            width: '5%'
        }, {
            field: 'crud',
            header: null,
            width: '20%',
            Component: ({item}) => (<UpdateBookModalLauncher book={item}/>)
        }]
    }),
    dispath => ({
        pageFetcher: ({page}) => rest.book.getBooks({page})
            .then(({data, pagination}) => dispath(getBooks({books: data, pagination})))
            .catch(({message}) => dispath(showBookErrorMessage({text: message})))
    })
)(Table);