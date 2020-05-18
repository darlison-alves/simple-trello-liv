import { connect } from "react-redux";
import { AddCardInput } from '../AddCardInput';
import { addCard } from "../../../redux/actions/card.action";
import { bindActionCreators } from "redux";

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        addCard
    }, dispatch)
}

const CardInputContainer = connect(null, mapDispatchToProps)(AddCardInput);

export default CardInputContainer