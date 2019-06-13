import PropTypes from "prop-types";

const Cell = ({column, item}) => {
    const {field, Component} = column;
    return <td>
        {Component ? <Component item={item}/> : _.get(item, field)}
    </td>
};

Cell.propTypes = {
    column: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
};

export default Cell;