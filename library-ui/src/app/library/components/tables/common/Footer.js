import PropTypes from "prop-types";
import Pagination from "../../pagination/Pagination";

const Footer = ({pagination, pageFetcher, columnCount}) => <tfoot>
<tr>
    <td colSpan={columnCount}>
        <div className="container">
            <div>
                <Pagination pagination={pagination} pageFetcher={pageFetcher}/>
            </div>
        </div>
    </td>
</tr>
</tfoot>;

Footer.propTypes = {
    pagination: PropTypes.object,
    fetcher: PropTypes.func,
    columnCount: PropTypes.number
};

export default Footer;