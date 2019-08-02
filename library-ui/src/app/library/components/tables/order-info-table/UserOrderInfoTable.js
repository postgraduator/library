import {connect} from "react-redux";
import {getUniqueKey} from "../../../utils/data-utils";
import Table from "../common/Table";
import {bindToDispatch, createOrderInfoStateCollector} from "./common";

export default connect(
    createOrderInfoStateCollector( ({current}) => getUniqueKey(_.get(current, 'user', ''))),
    bindToDispatch
)(Table);