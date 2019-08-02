import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Table from "../common/Table";
import {bindToDispatch, createOrderInfoStateCollector} from "./common";

export default withRouter(connect(
    createOrderInfoStateCollector((state, {match}) => _.get(match, 'params.id', '')),
    bindToDispatch
)(Table));