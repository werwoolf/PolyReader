import ReadingScreen from "./ReadingScreen";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { book } from "../../store/book/selectors";

const mapState = createStructuredSelector({ book });

export default connect(mapState)(ReadingScreen);
