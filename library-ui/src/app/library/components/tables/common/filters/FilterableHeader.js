import PropTypes from "prop-types";
import {Fragment} from "react";
import InputFilter from "./InputFilter";

const getFilter = filterable => {
    if (filterable) {
        return ({setFilterValue, filterValue}) => (<InputFilter filterValue={filterValue}
                                                                setFilterValue={setFilterValue}/>);
    }
    return null;
};

const FilterableHeader = ({columns, filters, setFilter}) => (<tr>
    {_.map(columns, column => {
        const Filter = getFilter(column.filterable);
        return <th key={column.field}>
            {Filter ?
                <Filter key={column.field} filterValue={_.get(filters, column.field)}
                        setFilterValue={value => setFilter(_.set({}, column.field, value))}/> :
                <Fragment/>
            }
        </th>
    })}
</tr>);

FilterableHeader.propTypes = {
    columns: PropTypes.array.isRequired,
    filters: PropTypes.object,
    setFilter: PropTypes.func.isRequired
};

export default FilterableHeader;