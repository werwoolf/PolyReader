import ReadingScreen from "./ReadingScreen";
import { currentPageContent, currentPage, book } from "../../store/book/selectors";
import { updateLastVisitedPage } from "../../store/book/asyncActions";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

const mapState = createStructuredSelector({ currentPageContent, currentPage, book });

const mapDispatch = { updateLastVisitedPage };

export default connect(mapState, mapDispatch)(ReadingScreen);
