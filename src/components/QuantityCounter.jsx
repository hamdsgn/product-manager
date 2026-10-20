import { useReducer } from "react";

function quantityReducer(state, action) {
    switch(action.type) {
        case "increment":
            return state + 1;

        case "decrement":
            return Math.max(1, state - 1);

        default:
            return state;
    }
}

function QuantityCounter() {
    const [state, dispatch] = useReducer(quantityReducer, 1);

    return(
        <>
            <button
                onClick={() => dispatch({type: "decrement"})}
            >
                -
            </button>
            <span>{state}</span>
            <button 
                onClick={() => dispatch({type: "increment"})}
                className="btn btn--secondary"
            >
                +
            </button>
        </>
    )

}

export default QuantityCounter;