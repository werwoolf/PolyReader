import MainScreen from "./MainScreen";
import { books, isLoading } from "../../store/books/selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { addBook, getBooks } from "../../store/books/asyncActions";

const mapState = createStructuredSelector({ books, isLoading });

const mapDispatch = { addBook, getBooks };

export default connect(mapState, mapDispatch)(MainScreen);
