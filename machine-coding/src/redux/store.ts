import {applyMiddleware, createStore} from 'redux';
import { rootReducer } from './reducers/rootReducer';
import { thunk } from 'redux-thunk';

const initialState = {
    count:0,
}

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk),
    
);
 