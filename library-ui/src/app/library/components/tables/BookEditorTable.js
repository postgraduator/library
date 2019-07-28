import {Fragment} from "react";
import {connect} from "react-redux";
import {rest} from "../../context";
import {getBooks, showBookErrorMessage} from "../../store/actions/book-actions";
import {showModal} from "../../store/actions/modal-actions";
import {OutlineDangerButton, OutlineSecondaryButton} from "../buttons/action-launcher";
import LibraryImage from "../images/LibraryImage"
import {MODAL_IDS} from "../modals/modal-ids";
import Table from "./common/Table";

const UpdateBookModalLauncher = connect(null, (dispatch, {book}) => ({
    launcher: () => dispatch(showModal(MODAL_IDS.UPDATE_BOOK_MODAL, book))
}))(({launcher}) => (<OutlineSecondaryButton launcher={launcher} title={'Update'}/>));

const DeleteBookModalLauncher = connect(null, (dispatch, {book}) => ({
    launcher: () => dispatch(showModal(MODAL_IDS.DELETE_BOOK_MODAL, book))
}))(({launcher}) => (<OutlineDangerButton launcher={launcher} title={'Delete'}/>));

export default connect(({books}) => ({
        data: _.get(books, 'items', []),
        pagination: _.get(books, 'pagination', {number: 0}),
        sort: _.get(books, 'sort', {}),
        filters: _.get(books, 'filters', {}),
        columns: [{
            field: 'name',
            header: 'Name',
            filterable: true,
            sortable: true,
            width: '50%'
        }, {
            field: 'price',
            header: 'Price',
            sortable: true,
            width: '15%'
        }, {
            field: 'count',
            header: 'Count',
            width: '5%'
        }, {
            field: 'picturePath',
            header: 'Picture',
            width: '10%',
            Component: ({item}) => (<LibraryImage path={item.picturePath && `book/${item.picturePath}`}/>)
        }, {
            field: 'crud',
            header: null,
            width: '20%',
            Component: ({item}) => (<Fragment>
                <UpdateBookModalLauncher book={item}/>
                <DeleteBookModalLauncher book={item}/>
            </Fragment>)
        }]
    }),
    dispatch => ({
        pageFetcher: params => rest.book.getBooks(params)
            .catch(({message}) => dispatch(showBookErrorMessage(message))),
        setStateData: props => dispatch(getBooks(props))
    })
)(Table);