import { connect } from "react-redux";
import { EditTitleTask } from "../EditTitleTask";
import { bindActionCreators } from "redux";
import { update, remove } from "../../../redux/actions/task.action";

const mapDispatch = dispatch => {
    return bindActionCreators({
        update,
        remove
    }, dispatch)
}

const EditTitleTaskContainer = connect(null, mapDispatch)(EditTitleTask);
export default EditTitleTaskContainer;