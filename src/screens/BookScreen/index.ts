import BookScreen from './BookScreen';
import { getBook, deleteBook } from "../../store/book/asyncActions";
import { book } from "../../store/book/selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

const mapState = createStructuredSelector({ book });

const mapDispatch = { getBook, deleteBook };

export default connect(mapState, mapDispatch)(BookScreen);
