import { connect } from "react-redux";
import { AddNewTask } from "../addNewTask";
import { addNewTask } from "../../../redux/actions/card.action";
import { bindActionCreators } from "redux";

const mapDispatch = dispatch => {
    return bindActionCreators({
        addNewTask
    }, dispatch);
}

const AddNewTaskContainer = connect(null, mapDispatch)(AddNewTask)

export default AddNewTaskContainer;