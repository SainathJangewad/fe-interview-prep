import { DECREMENT, INCREMENT, RESET } from '../actions/counterActions';
import   { CounterState,CounterActionsTypes } from '../types'

const initialState:CounterState = {count:0};

export const counterReducer = (state:CounterState=initialState,action:{type:CounterActionsTypes})=>{
    switch (action.type) {
        
        case INCREMENT:
            console.log('increment')
            return {...state,count : state.count + 1};

            case DECREMENT:
                console.log('descrement')
            return {...state,count : state.count- 1};
            
            
            case RESET:
            return {...state,count : 0};
    
        default:
            return state;
    }
}