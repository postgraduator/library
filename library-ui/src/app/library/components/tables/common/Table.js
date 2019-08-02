import PropTypes from "prop-types";
import {areFiltersChanged, getPage, isPageChanged, isSortChanged} from "../../../utils/page-state-verifiers";
import PaginatedComponent from "../../common/PaginatedComponent";
import Cell from "./Cell";
import Footer from "./Footer";
import Header from "./Header";

const TablePage = ({tableClassName = 'table table-striped', columns, pagination, data, sort, filters, setStateData}) => (<table className={tableClassName}>
    <Header columns={columns}
            sort={sort}
            setSort={sort => setStateData({data, pagination, sort, filters})}
            filters={filters}
            setFilter={filter => setStateData({
                data,
                pagination: _.set(pagination, 'number', 0),
                sort,
                filters: {..._.assign({...filters}, filter)}
            })}/>
    <tbody>
    {_.map(data, (item, index) => (<tr key={`table-${index}`}>
        {_.map(columns, column => <Cell key={column.field} column={column} item={item}/>)}
    </tr>))}
    </tbody>
    <Footer pagination={pagination}
            columnCount={columns.length}
            pageFetcher={number => setStateData({data, pagination: {number}, sort, filters})}/>
</table>);

TablePage.propTypes = {
    tableClassName: PropTypes.string,
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    setStateData: PropTypes.func.isRequired,
    sort: PropTypes.object,
    filters: PropTypes.object
};

export default ({tableClassName, columns, pagination, data, sort, filters, setStateData, pageFetcher, fetchParams}) => {
    const Table = () => (<TablePage tableClassName={tableClassName}
                                    setStateData={params => setStateData({...params, ...fetchParams})}
                                    data={data}
                                    columns={columns}
                                    pagination={pagination}
                                    sort={sort}
                                    filters={filters}/>);
    const isUpdateNecessary = (currentProps, {pageState}) => isPageChanged(currentProps, pageState) ||
        isSortChanged(currentProps, pageState) ||
        areFiltersChanged(currentProps, pageState);
    const remoteFetcher = () => pageFetcher({page: getPage(pagination), sort, filters, fetchParams})
        .then(({data, pagination}) => setStateData({data, pagination, sort, filters, ...fetchParams}));

    const pageState = {pagination, sort, filters};
    return <PaginatedComponent pageFetcher={remoteFetcher}
                               isUpdateNecessary={isUpdateNecessary}
                               pageState={pageState}>
        <Table/>
    </PaginatedComponent>
};