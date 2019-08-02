import PropTypes from "prop-types";
import {Fragment} from "react";
import {connect} from "react-redux";
import {rest} from "../../context";
import {getBooks, showBookErrorMessage} from "../../store/actions/book-actions";
import {showModal} from "../../store/actions/modal-actions";
import {addOneToOrder} from "../../store/actions/order-actions";
import {areFiltersChanged, getPage, isPageChanged, isSortChanged} from "../../utils/page-state-verifiers";
import {OutlineSecondaryButton} from "../buttons/action-launcher";
import PaginatedComponent from "../common/PaginatedComponent";
import LibraryImage from "../images/LibraryImage";
import {MODAL_IDS} from "../modals/modal-ids";
import Pagination from "../pagination/Pagination";

const BOOTSTRAP_GRID_SYSTEM_ITEM_COUNT = 12;

const BookRow = ({bootstrapColNum, books, addToCart}) => (<div className="row">
    {_.map(books, book => {
        const {name, count, price, picturePath, author} = book;
        return <div key={name} className={`col-sm-${bootstrapColNum} card`}>
            <LibraryImage path={picturePath && `book/${picturePath}`} className="card-img-top" size={'lg'}/>
            <div className="card-body">
                <p className="card-text">Name: {name}</p>
                <p className="card-text">Author: {author}</p>
                <p className="card-text">Available count: {count}</p>
                <p className="card-text">Price: {price}</p>
                <OutlineSecondaryButton launcher={() => addToCart(book)} title={'Add To Order'}/>
            </div>
        </div>
    })}
</div>);

const BookRepresentation = ({rowItemCount, books, addToCart}) => {
    const bootstrapModifier = _.floor(BOOTSTRAP_GRID_SYSTEM_ITEM_COUNT / rowItemCount);
    const chunkedBooks = _.chunk(books, rowItemCount);
    return <Fragment>
        <div className="container">
            {_.map(chunkedBooks, (bookRow, index) => <BookRow key={index}
                                                              addToCart={addToCart}
                                                              books={bookRow}
                                                              bootstrapColNum={bootstrapModifier}/>)}
        </div>
    </Fragment>
};

const BookGrid = ({rowItemCount = 3, pagination, data, sort, filters, setStateData, pageFetcher, addToOrder}) => {
    const getRemoteData = () => pageFetcher({page: getPage(pagination), sort, filters})
        .then(({data, pagination}) => setStateData({data, pagination, sort, filters}));
    const isUpdateNecessary = (currentState, {pageState}) => isPageChanged(currentState, pageState) ||
        isSortChanged(currentState, pageState) ||
        areFiltersChanged(currentState, pageState);
    const changeDataPage = number => setStateData({data, sort, pagination: {number}, filters});

    const pageState = {sort, pagination, filters};
    return <PaginatedComponent pageFetcher={getRemoteData} pageState={pageState} isUpdateNecessary={isUpdateNecessary}>
        <BookRepresentation rowItemCount={rowItemCount} books={data} addToCart={addToOrder}/>
        <Pagination pageFetcher={changeDataPage} pagination={pagination}/>
    </PaginatedComponent>
};

BookGrid.propTypes = {
    rowItemCount: (props, propName) => props[propName] <= 12,
    data: PropTypes.array,
    pagination: PropTypes.object,
    sort: PropTypes.object,
    setStateData: PropTypes.func.isRequired,
    pageFetcher: PropTypes.func.isRequired,
    addToOrder: PropTypes.func.isRequired
};

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
        setStateData: props => dispatch(getBooks(props)),
        addToOrder: orderItem => {
            dispatch(addOneToOrder(orderItem));
            dispatch(showModal(MODAL_IDS.ORDER_MODAL));
        }
    }))(BookGrid);