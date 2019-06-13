import PropTypes from "prop-types";
import Cell from "./Cell";
import Footer from "./Footer";
import Header from "./Header";

const Table = ({tableClassName = 'table table-striped', columns, pagination, data}) => {
    return <table className={tableClassName}>
        <Header columns={columns}/>
        <tbody>
        {_.map(data, item => (<tr>
            {_.map(columns, column => <Cell column={column} item={item}/>)}
        </tr>))}
        </tbody>
        <Footer pagination={pagination}/>
    </table>;
};

Table.propTypes = {
    tableClassName: PropTypes.string,
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired
};

export default Table;