import React, { type Dispatch, useState, type DragEvent } from 'react'
import TextBuilder from './TextBuilder';
import SelectionBuilder from './SelectionBuilder';
import styles from "../styles/components/dropper.module.css"
import { Action } from '../global.types';
import { nanoid } from 'nanoid';

export type BiulderState={data:string; id:string;}

function Dropper({dispatch}:{dispatch: Dispatch<Action>}) {
    const [builders,setBuilders]= useState<BiulderState[]>([]);

    const handleDrop= (e: DragEvent<HTMLParagraphElement>,index:number)=>{

        const data= e.dataTransfer.getData("text/plain");
        setBuilders(prev=>{
            const res= [...prev];
            res.splice(index+1,0,{data,id: nanoid()});
            return res;
        })
    }

    const renderBuilder= (builder:BiulderState,index: number)=>{
        switch(builder.data){
            case "text":
                return (
                    <TextBuilder dispatch={dispatch} index={index} setBuilders={setBuilders}/>)
            case "select":
                return (<>
                    <SelectionBuilder dispatch={dispatch} index={index}/>
                </>)
            default:
                return null
        }
    }

  return (
    <div className={`${styles.container} box-shadow`} onDragOver={(e)=>{e.preventDefault();}}
        onDrop={e=>{
            e.preventDefault();
            handleDrop(e,0);
        }}
    >
    <h2>Form Builder</h2>
      {builders.map((builder,index)=>{

        return (<div key={builder.id} className={styles.formItem} 
        >
        {renderBuilder(builder,index)}
        </div>)
        
      })}
    </div>
  )
}



export default Dropper
