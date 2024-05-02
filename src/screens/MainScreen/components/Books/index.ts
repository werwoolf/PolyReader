import Books from "./Books";
import { books } from "../../../../store/books/selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

const mapState = createStructuredSelector({ books });

export default connect(mapState)(Books);
