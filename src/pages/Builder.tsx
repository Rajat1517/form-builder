import { useReducer} from 'react'
import type {Layout, Action} from "../global.types"
import Lifter from '../components/Lifter';
import Dropper from '../components/Dropper';
import Preview from '../components/Preview';

const Builder = ()=> {
    
    const reducer = (state: Layout, action: Action): Layout => {

        const {index,status}= action.payload;
        console.log(action.payload.id, action.payload.index);
        switch(action.type){
            case "text":
                if(index>= state.length && status === "build")
                    return [...state, action.payload ];
                return [
                    ...state.slice(0, index),
                    action.payload,
                    ...state.slice(index + (status === "build" ? 0 : 1))
                ];
            case "select":
                if(index>= state.length && status === "build")
                    return [...state, action.payload ];
                return [
                    ...state.slice(0, index),
                    action.payload,
                    ...state.slice(index + (status === "build" ? 0 : 1))
                ];
            default:
                return state;
        }
    }
    const [layout, dispatch]= useReducer(reducer, []);


  return (
    <>
    <Lifter/>
    <div className='right-pane'>
    <Dropper dispatch={dispatch}/>
    <Preview layout={layout}/>
    </div>
    </>
  )
}

export default Builder;
