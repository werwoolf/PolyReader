import ReadingScreen from "./ReadingScreen";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { currentPageContent } from "../../store/book/selectors";

const mapState = createStructuredSelector({ currentPageContent });

export default connect(mapState)(ReadingScreen);
