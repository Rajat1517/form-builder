import { useReducer } from 'react'
import type { Layout, Action } from "../global.types"
import Lifter from '../components/Lifter';
import Dropper from '../components/Dropper';
import Preview from '../components/Preview';

const Builder = () => {

    const reducer = (state: Layout, action: Action): Layout => {

        const { index, status } = action.payload;

        switch (action.type) {
            case "text":
            case "select":
            case "radio":
            case "date":
            case "time":
                if (index >= state.length && status === "build")
                    return [...state, action.payload];
                return [
                    ...state.slice(0, index),
                    action.payload,
                    ...state.slice(index + (status === "build" ? 0 : 1))
                ];
            case "delete":
                return [...state.slice(0, index), ...state.slice(index + 1)]
            default:
                return state;
        }
    }
    const [layout, dispatch] = useReducer(reducer, []);


    return (
        <div className='App'>
            <Lifter />
            <div className='right-pane'>
                <Dropper dispatch={dispatch} />
                <Preview layout={layout} />
            </div>
        </div>
    )
}

export default Builder;
