import PropTypes from "prop-types";
import {Component, Fragment} from "react";
import Cell from "./Cell";
import Footer from "./Footer";
import Header from "./Header";

class Table extends Component {
    render() {
        const {tableClassName, columns, pagination, data, pageFetcher, sort, filters, setStateData} = this.props;
        return <Fragment>
            <table className={tableClassName}>
                <Header columns={columns} sort={sort} setSort={sort => setStateData({data, pagination, sort, filters})}/>
                <tbody>
                {_.map(data, (item, index) => (<tr key={`table-${index}`}>
                    {_.map(columns, column => <Cell key={column.field} column={column} item={item}/>)}
                </tr>))}
                </tbody>
                <Footer pagination={pagination}
                        columnCount={columns.length}
                        pageFetcher={number => setStateData({data, pagination: {number}, sort, filters})}/>
            </table>
        </Fragment>;
    }
    static _getPage(pagination) {
        const page = _.get(pagination, 'number', 0);
        return page > -1 ? page : 0;
    }
    _isUpdateNecessary(prevProps) {
        const isPageChanged = ({pagination}) => {
            const previousPage = Table._getPage(prevProps.pagination);
            const currentPage = _.get(pagination, 'number', 0);
            return currentPage !== previousPage;
        };
        const isSortChanged = ({sort}) => {
            return !_.isEqual(sort, prevProps.sort);
        };

        return _.overSome(isPageChanged, isSortChanged)(this.props);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {pageFetcher, pagination, sort, filters, setStateData} = this.props;
        this._isUpdateNecessary(prevProps) && pageFetcher({page: Table._getPage(pagination), sort, filters})
            .then(({data, pagination}) => setStateData({data, pagination, sort, filters}));
    }
    componentDidMount() {
        const {pageFetcher, pagination, sort, filters, setStateData} = this.props;
        pageFetcher({page: Table._getPage(pagination), sort, filters})
            .then(({data, pagination}) => setStateData({data, pagination, sort, filters}));
    }
}

Table.defaultProps = {
    tableClassName: 'table table-striped',
};

Table.propTypes = {
    tableClassName: PropTypes.string,
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    pageFetcher: PropTypes.func.isRequired,
    setStateData: PropTypes.func.isRequired,
    sort: PropTypes.object,
    filters: PropTypes.object
};

export default Table;