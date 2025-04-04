import { useDispatch } from "react-redux"
import { decrement, increment, reset } from "../actions/counterActions";


const Counter = () => {
    const dispatch = useDispatch();



    return <div>
        <button onClick={() => dispatch(increment())}>inc</button>
        <button onClick={() => dispatch(decrement())}>dec</button>
        <button onClick={() => dispatch(reset())}>reset</button>
    </div>
}

export default Counter;