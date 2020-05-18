import { connect } from "react-redux";
import { Board } from "..";
import { bindActionCreators } from "redux";
import { getListCards, saveNewOrder, modifyTaskFromCard } from "../../../redux/actions/card.action";

const mapStateToProps = state => (
    {
        cards: state.card,
        cardLoading: state.card.loading
    }
)

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getListCards,
        saveNewOrder,
        modifyTaskFromCard
    }, dispatch)
}

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);
export default BoardContainer;