import PropTypes from "prop-types";
import {Component, Fragment} from "react";

class PaginatedComponent extends Component {
    render() {
        return <Fragment>
            {this.props.children}
        </Fragment>;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {pageFetcher, isUpdateNecessary, pageState} = this.props;
        isUpdateNecessary(pageState, prevProps) && pageFetcher();
    }

    componentDidMount() {
        const {pageFetcher} = this.props;
        pageFetcher();
    }
}

PaginatedComponent.propTypes = {
    pageFetcher: PropTypes.func.isRequired,
    isUpdateNecessary: PropTypes.func.isRequired,
    pageState: PropTypes.object
};

export default PaginatedComponent;