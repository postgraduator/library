import PropTypes from "prop-types";
import {Fragment} from "react";
import SortedHeaderCell from "./SortedHeaderCell";
import UnsortedHeaderCell from "./UnsortedHeaderCell";

const SortableHeader =  ({columns, sort, setSort}) => (<tr>
    {_.map(columns, column => (<Fragment key={column.field}>
        {column.sortable ?
            <SortedHeaderCell key={column.field} header={column.header} sort={sort}
                            setSort={setSort}
                            field={column.field}/> :
            <UnsortedHeaderCell key={column.field} header={column.header}/>}
    </Fragment>))}
</tr>);

SortableHeader.propTypes = {
    columns: PropTypes.array.isRequired,
    sort: PropTypes.object,
    setSort: PropTypes.func
};

export default SortableHeader;