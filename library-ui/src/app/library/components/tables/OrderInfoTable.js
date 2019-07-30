import {format} from "date-fns";
import {Fragment} from "react";
import {connect} from "react-redux";
import {rest} from "../../context";
import {
    getOrderInfoPage,
    removeOrderInfoMessage,
    showOrderInfoErrorMessage
} from "../../store/actions/order-info-actions";
import {getUniqueKey} from "../../utils/data-utils";
import Table from "./common/Table";

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
        {_.reduce(orderedBooks, (result, {count, price}) => _.floor(result + count * price, 2),0)}
    </Fragment>
);

export default connect(
    ({orderInfo, current}) => ({
        data: _.get(orderInfo, 'items', []),
        pagination: _.get(orderInfo, 'pagination', {number: 0}),
        sort: _.get(orderInfo, 'sort', {}),
        filters: _.get(orderInfo, 'filters', {}),
        fetchParams: {userId: getUniqueKey(_.get(current, 'user', {}))},
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
    }),
    dispatch => ({
        pageFetcher: params => rest.order.getOrders(params)
            .then(data => {
                dispatch(removeOrderInfoMessage());
                return data;
            })
            .catch(() => dispatch(showOrderInfoErrorMessage('An unexpected server error occurred.'))),
        setStateData: params => dispatch(getOrderInfoPage(params))
    })
)(Table);