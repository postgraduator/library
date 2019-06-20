import PropTypes from "prop-types";
import {Component, Fragment} from "react";
import Cell from "./Cell";
import Footer from "./Footer";
import Header from "./Header";
import {createFooterPageFetcher} from "./helper";

class Table extends Component {
    render() {
        const {tableClassName, columns, pagination, data, pageFetcher} = this.props;
        return <Fragment>
            <table className={tableClassName}>
                <Header columns={columns}/>
                <tbody>
                {_.map(data, (item, index) => (<tr key={`table-${index}`}>
                    {_.map(columns, column => <Cell key={column.field} column={column} item={item}/>)}
                </tr>))}
                </tbody>
                <Footer pagination={pagination} columnCount={columns.length} pageFetcher={pageFetcher}/>
            </table>
        </Fragment>;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {pageFetcher, pagination, refreshed} = this.props;
        refreshed || pageFetcher({page: _.get(pagination, 'number', 0)});
    }
    componentDidMount() {
        const {pageFetcher, pagination} = this.props;
        pageFetcher({page: _.get(pagination, 'number', 0)});
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
    refreshed: PropTypes.bool.isRequired
};

export default Table;