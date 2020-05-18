import { connect } from "react-redux";
import { EditTitle } from "../EditTitle";
import { bindActionCreators } from "redux";
import { update, remove } from "../../../redux/actions/card.action";



const mapDispatch = dispatch => {
    return bindActionCreators({
        update,
        remove
    }, dispatch)
}

const EditTitleContainer = connect(null, mapDispatch)(EditTitle)

export default EditTitleContainer;