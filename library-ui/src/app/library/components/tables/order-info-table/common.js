import {format} from "date-fns";
import {Fragment} from "react";
import {rest} from "../../../context";
import {
    getOrderInfoPage,
    removeOrderInfoMessage,
    showOrderInfoErrorMessage
} from "../../../store/actions/order-info-actions";
import {DEFAULT_PAGE_STATE} from "../../../store/reducers/order-info-reducer";

const BookList = ({orderedBooks}) => (<ul className="list-group">
    {_.map(orderedBooks, ({book, count, price}) => <li key={book.name} className="list-group-item">
        <div className="row">
            <div className="col-sm-6">
                {book.name}
            </div>
            <div className="col-sm-3">
                Count: {count}
            </div>
            <div className="col-sm-3">
                Price: {price}
            </div>
        </div>
    </li>)}
</ul>);

const OverallPrice = ({orderedBooks}) => (<Fragment>
        {_.reduce(orderedBooks, (result, {count, price}) => _.floor(result + count * price, 2), 0)}
    </Fragment>
);

export const createOrderInfoStateCollector = userIdGetter => (state, ownProps) => {
    const {orderInfo} = state;
    const userId = userIdGetter(state, ownProps);
    return {
        data: _.get(orderInfo, `${userId}.items`, []),
        pagination: _.get(orderInfo, `${userId}.pagination`, DEFAULT_PAGE_STATE.pagination),
        sort: _.get(orderInfo, `${userId}.sort`, DEFAULT_PAGE_STATE.sort),
        filters: _.get(orderInfo, `${userId}.filters`, {}),
        fetchParams: {userId},
        columns: [{
            field: 'createdOn',
            header: 'Date of creation',
            width: '20%',
            Component: ({item}) => (<Fragment>{format(item.createdOn, 'MM/DD/YYYY')}</Fragment>),
            sortable: true
        }, {
            field: 'books',
            header: 'Books',
            width: '65%',
            Component: ({item}) => (<BookList orderedBooks={item.orderedBooks}/>)
        }, {
            field: 'price',
            header: 'Total price',
            width: '15%',
            Component: ({item}) => (<OverallPrice orderedBooks={item.orderedBooks}/>)
        }]
    }
};

export const bindToDispatch = dispatch => ({
    pageFetcher: params => rest.order.getOrders(params)
        .then(data => {
            dispatch(removeOrderInfoMessage());
            return data;
        })
        .catch(() => dispatch(showOrderInfoErrorMessage('An unexpected server error occurred.'))),
    setStateData: params => dispatch(getOrderInfoPage(params))
});