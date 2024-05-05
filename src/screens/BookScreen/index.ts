import BookScreen from "./BookScreen";
import { getBook, deleteBook } from "../../store/book/asyncActions";
import { book } from "../../store/book/selectors";
import { clearState } from "../../store/book/slice";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

const mapState = createStructuredSelector({ book });

const mapDispatch = { getBook, deleteBook, clearState };

export default connect(mapState, mapDispatch)(BookScreen);
