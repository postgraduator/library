import PropTypes from "prop-types";
import {Component} from "react";
import {connect} from "react-redux";
import {addNewBook, getBooks} from "../../store/actions/book-actions";
import Table from "./common/Table";
import {rest} from "../../context";

class BookEditorTable extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            field: 'name'
        }];
    }

    componentDidMount() {
        const {fetch} = this.props;
        fetch();
    }

    render() {
        const {data} = this.props;
        return (<Table pagination={{}} columns={this.columns} data={data}/>);
    }
}

BookEditorTable.defaultProps = {
    data: []
};

BookEditorTable.propTypes = {
    data: PropTypes.array,
    fetch: PropTypes.func.isRequired
};

export default connect(({books}) => ({
        data: _.get(books, 'items', [])
    }),
    dispath => ({
        fetch: () => rest.book.getBooks()
            .then(({data}) => dispath(getBooks(data)))
            .catch(({message}) => addNewBook({name: message}))
    })
)(BookEditorTable);