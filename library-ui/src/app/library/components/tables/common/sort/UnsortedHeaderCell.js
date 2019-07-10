import PropTypes from "prop-types";
import {Fragment} from "react";

const UnsortedHeaderCell =  ({header}) => (<th>
    {_.isFunction(header) ? <header/> : <Fragment>{header}</Fragment>}
</th>);

UnsortedHeaderCell.propTypes = {
    header: PropTypes.any
};

export default UnsortedHeaderCell;

