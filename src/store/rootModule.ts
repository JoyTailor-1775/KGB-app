import { combineReducers } from 'redux';
import familiesReducers from './families/reducers';

export default combineReducers({
  families: familiesReducers,
});
