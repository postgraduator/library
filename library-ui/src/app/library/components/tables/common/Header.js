import {Fragment} from "react";

const Header = ({columns = []}) => {
    const visibleHeader = _.some(columns, 'header');
    return <Fragment>
        {visibleHeader && (
            <thead>
            <tr>
                {_.map(columns, column => (<th key={column.field}>{column.header}</th>))}
            </tr>
            </thead>)}
    </Fragment>
};

export default Header;