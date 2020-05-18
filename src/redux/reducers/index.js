import { combineReducers } from 'redux';
import {reducer as toastr} from 'react-redux-toastr'

import card from './card.reducer';

export default combineReducers({
    card,
    toastr
})