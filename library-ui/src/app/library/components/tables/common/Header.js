import PropTypes from "prop-types";
import {Fragment} from "react";
import FilterableHeader from "./filters/FilterableHeader";
import SortableHeader from "./sort/SortableHeader";

const Header = ({columns = [], sort, setSort, filters, setFilter}) => {
    const caption = _.some(columns, 'header');
    const filterable = _.some(columns, 'filterable');
    return <Fragment>
        {(caption || filterable) && (
            <thead>
            {caption && <SortableHeader sort={sort} setSort={setSort} columns={columns}/>}
            {filterable && <FilterableHeader filters={filters} setFilter={setFilter} columns={columns}/>}
            </thead>)}
    </Fragment>
};

Header.propTypes = {
    columns: PropTypes.array,
    sort: PropTypes.object,
    setSort: PropTypes.func,
    filters: PropTypes.object,
    setFilter: PropTypes.func
};

export default Header;