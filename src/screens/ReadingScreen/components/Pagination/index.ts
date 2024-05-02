import Pagination from "./Pagination";
import { createStructuredSelector } from "reselect";
import { pagination } from "../../../../store/book/selectors";
import { connect } from "react-redux";
import { nextPage, previousPage } from "../../../../store/book/slice";

const mapState = createStructuredSelector({ pagination });

const mapDispatch = { nextPage, previousPage };

export default connect(mapState, mapDispatch)(Pagination);
