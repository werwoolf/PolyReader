import MainScreen from "./MainScreen";
import { books } from "../../store/books/selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { addBook } from "../../store/books/slice";
import { getBooks } from "../../store/books/asyncActions";

const mapState = createStructuredSelector({ books })

const mapDispatch = { addBook, getBooks }

export default connect(mapState, mapDispatch)(MainScreen);
