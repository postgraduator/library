import {connect} from "react-redux";
import {rest} from "../../context";
import {getBooks, showBookErrorMessage} from "../../store/actions/book-actions";
import DataGrid from "./DataGrid";

export default connect(
    ({availableBooks}) => ({
        data: _.get(availableBooks, 'items', []),
        pagination: _.get(availableBooks, 'pagination', {page: 0}),
        sort: _.get(availableBooks, 'sort', {name: 'asc'}),
        filters: _.get(availableBooks, 'filters')
    }),
    dispatch => ({
        pageFetcher: params => rest.book.getBooks(params)
            .catch(({message}) => dispatch(showBookErrorMessage(message))),
        setStateData: props => dispatch(getBooks(props))
    }))(DataGrid);