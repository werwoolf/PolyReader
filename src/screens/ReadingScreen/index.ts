import ReadingScreen from "./ReadingScreen";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { currentPageContent, pagination } from "../../store/book/selectors";

const mapState = createStructuredSelector({ currentPageContent, pagination });

export default connect(mapState)(ReadingScreen);
