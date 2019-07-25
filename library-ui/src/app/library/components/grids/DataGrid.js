import PropTypes from "prop-types";
import {Fragment} from "react";
import {areFiltersChanged, getPage, isPageChanged, isSortChanged} from "../../utils/page-state-verifiers";
import PaginatedComponent from "../common/PaginatedComponent";
import LibraryImage from "../images/LibraryImage";
import Pagination from "../pagination/Pagination";

const BOOTSTRAP_GRID_SYSTEM_ITEM_COUNT = 12;

const DataRow = ({bootstrapColNum, data}) => (<div className="row">
    {_.map(data, ({name, count, picturePath}) => {
        return <div key={name} className={`col-sm-${bootstrapColNum}`}>
            <LibraryImage path={picturePath && `book/${picturePath}`} size={'lg'}/>
            <p>{name}</p>
            <p>Available count: {count}</p>
        </div>
    })}
</div>);

const DataRepresentation = ({rowItemCount, data}) => {
    const bootstrapModifier = _.floor(BOOTSTRAP_GRID_SYSTEM_ITEM_COUNT / rowItemCount);
    const chunkedData = _.chunk(data, rowItemCount);
    return <Fragment>
        <div className="container">
            {_.map(chunkedData, (dataRow, index) => <DataRow key={index} data={dataRow} bootstrapColNum={bootstrapModifier}/>)}
        </div>
    </Fragment>
};

const DataGrid = ({rowItemCount = 3, pagination, data, sort, filters, setStateData, pageFetcher}) => {
    const getRemoteData = () => pageFetcher({page: getPage(pagination), sort, filters})
        .then(({data, pagination}) => setStateData({data, pagination, sort, filters}));
    const isUpdateNecessary = (currentState, {pageState}) => isPageChanged(currentState, pageState) ||
        isSortChanged(currentState, pageState) ||
        areFiltersChanged(currentState, pageState);
    const changeDataPage = number => setStateData({data, sort, pagination: {number}, filters});

    const pageState = {sort, pagination, filters};
    return <PaginatedComponent pageFetcher={getRemoteData} pageState={pageState} isUpdateNecessary={isUpdateNecessary}>
        <DataRepresentation rowItemCount={rowItemCount} data={data}/>
        <Pagination pageFetcher={changeDataPage} pagination={pagination}/>
    </PaginatedComponent>
};

DataGrid.propTypes = {
    rowItemCount: (props, propName) => props[propName] <= 12,
    data: PropTypes.array,
    pagination: PropTypes.object,
    sort: PropTypes.object,
    setStateData: PropTypes.func.isRequired,
    pageFetcher: PropTypes.func.isRequired
};

export default DataGrid;