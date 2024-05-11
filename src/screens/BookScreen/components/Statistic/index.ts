import Statistic from "./Statistic";
import { statistic } from "../../../../store/book/selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

const mapState = createStructuredSelector({ statistic });

export default connect(mapState)(Statistic);
