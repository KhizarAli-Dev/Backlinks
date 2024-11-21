import { createStore, combineReducers } from 'redux';
import roleReducer from './reducers/roleReducer';

const rootReducer = combineReducers({
    role: roleReducer,
  });
  

const store = createStore(rootReducer);

export default store;
