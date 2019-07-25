import PropTypes from "prop-types";
import {createPaginationList} from "./helper";

const Pagination = ({pagination, pageFetcher}) => {
    const {totalPages, number} = pagination;
    const hidden = _.isEmpty(pagination) || !(_.isNumber(totalPages) && totalPages >= 2);
    const paginationList = hidden || createPaginationList(pagination);
    const calculateClassModifier = item => {
        const disabledModifier = item.value < 0 || item.value >= totalPages ? 'disabled' : '';
        const activeModifier = item.value === number ? 'active' : '';
        return _.trim(`${disabledModifier} ${activeModifier}`);
    };
    return <ul className="pagination pagination-sm">
        {hidden || _.map(paginationList, item => (
            <li key={item.view} className={`page-item ${calculateClassModifier(item)}`}>
                <a className="page-link"
                   onClick={() => pagination.number !== item.value && pageFetcher(item.value)}>{item.view}</a>
            </li>))}
    </ul>
};

Pagination.propTypes = {
    pagination: PropTypes.object,
    pageFetcher: PropTypes.func.isRequired
};

export default Pagination;