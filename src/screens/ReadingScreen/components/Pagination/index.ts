import Pagination from "./Pagination";
import { pagination } from "../../../../store/book/selectors";
import { nextPage, previousPage } from "../../../../store/book/slice";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

const mapState = createStructuredSelector({ pagination });

const mapDispatch = { nextPage, previousPage };

export default connect(mapState, mapDispatch)(Pagination);
