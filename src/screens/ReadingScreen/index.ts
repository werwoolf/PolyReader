import ReadingScreen from "./ReadingScreen";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { book } from "../../store/book/selectors";
import { getBook } from "../../store/book/asyncActions";

const mapState = createStructuredSelector({ book });

const mapDispatch = { getBook };

export default connect(mapState, mapDispatch)(ReadingScreen);
