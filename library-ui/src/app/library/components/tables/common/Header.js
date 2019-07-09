import PropTypes from "prop-types";
import {Fragment} from "react";

const SORT = {
    asc: 'asc',
    desc: 'desc'
};

const getCellSortClass = direction => {
    const sortClass = 'column-sort';
    switch (direction) {
        case SORT.asc :
            return `${sortClass} column-sort-asc`;
        case SORT.desc :
            return `${sortClass} column-sort-desc`;
        default :
            return sortClass;
    }
};

const sortColumn = ({field, sort}) => {
    const nextOrder = sortOrder => {
        const orders = ['', SORT.asc, SORT.desc];
        const currentSortIndex = _.indexOf(orders, sortOrder);
        if (currentSortIndex === -1 || currentSortIndex === orders.length - 1) {
            return _.head(orders);
        }
        return _.nth(orders, currentSortIndex + 1);
    };

    if (_.isEmpty(sort) || _(sort).keys().every(value => value !== field)) {
        return _.set({}, field, SORT.asc);
    }
    return _.set({}, field, nextOrder(_.get(sort, field)));
};

const CellHeaderContent = ({header}) => (<Fragment>
    {_.isFunction(header) ? <header/> : <Fragment>{header}</Fragment>}
</Fragment>);

const UnsortedHeaderCell = ({header}) => (<th><CellHeaderContent header={header}/></th>);

const SortHeaderCell = ({sort, field, header, setSort}) => (<th onClick={() => setSort(sortColumn({sort, field}))}
                                                       className={getCellSortClass(_.get(sort, field))}>
    <CellHeaderContent header={header}/>
</th>);

const Header = ({columns = [], sort, setSort}) => {
    const visibleHeader = _.some(columns, 'header');
    return <Fragment>
        {visibleHeader && (
            <thead>
            <tr>
                {_.map(columns, column => (<Fragment key={column.field}>
                    {column.sortable ?
                        <SortHeaderCell key={column.field} header={column.header} sort={sort}
                                        setSort={setSort}
                                        field={column.field}/> :
                        <UnsortedHeaderCell key={column.field} header={column.header}/>}
                </Fragment>))}
            </tr>
            </thead>)}
    </Fragment>
};

Header.propTypes = {
    columns: PropTypes.array,
    sort: PropTypes.object,
    setSort: PropTypes.func
};

export default Header;