import ReadingScreen from "./ReadingScreen";
import { currentPageContent, book } from "../../store/book/selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

const mapState = createStructuredSelector({ currentPageContent, book });

export default connect(mapState)(ReadingScreen);
