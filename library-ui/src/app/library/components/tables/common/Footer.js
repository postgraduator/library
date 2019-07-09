import PropTypes from "prop-types";
import {Fragment} from "react";
import {createPaginationList} from "./helper";

const Footer = ({pagination, pageFetcher, columnCount}) => {
    const {totalPages, number} = pagination;
    const paginationList = createPaginationList(pagination);
    const calculateClassModifier = item => {
        const disabledModifier = item.value < 0 || item.value >= totalPages ? 'disabled' : '';
        const activeModifier = item.value === number ? 'active' : '';
        return _.trim(`${disabledModifier} ${activeModifier}`);
    };
    const hidden = _.isEmpty(pagination) || !(_.isNumber(totalPages) && totalPages >= 2);
    return <Fragment>
        {hidden || (
            <tfoot>
            <tr>
                <td colSpan={columnCount}>
                    <div className="container">
                        <div>
                            <ul className="pagination pagination-sm">
                                {_.map(paginationList, item => (
                                    <li key={item.view} className={`page-item ${calculateClassModifier(item)}`}>
                                        <a className="page-link"
                                           onClick={() => pageFetcher(item.value)}>{item.view}</a>
                                    </li>))}
                            </ul>
                        </div>
                    </div>
                </td>
            </tr>
            </tfoot>
        )}
    </Fragment>
};

Footer.propTypes = {
    pagination: PropTypes.object,
    fetcher: PropTypes.func,
    columnCount: PropTypes.number
};

export default Footer;