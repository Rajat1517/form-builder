import React, { useState, type FormEvent, type DragEvent} from 'react'
import type { Dispatch, SetStateAction } from 'react';
import type {Action, TextInput} from "../global.types";
import { nanoid } from 'nanoid';
import styles from "../styles/components/dropper.module.css"
import type { BiulderState } from './Dropper';


function TextBuilder ({dispatch,index, setBuilders}: {dispatch: React.Dispatch<Action>; index: number; setBuilders: Dispatch<SetStateAction<BiulderState[]>>}) {
    const [hasValidations,setHasValidations]= useState(false);
    const [isEditing,setIsEditing]= useState(true);
    const [status,setStatus]= useState("build");
    const [id]= useState(nanoid());
    const [values,setValues]= useState<TextInput>({
      name: "",
      label: "",
      id,
      index,
      required: false,
      status,
      type: "text",
      validation: {
        text: {
          maxLength:0,
          minLength:0,
          regex: "",
        }
      }
    });
    const [isDragOverTop,setIsDragOverTop]= useState(false);
    const [isDragOverBottom,setIsDragOverBottom]= useState(false);
    const handleSubmit= (e: FormEvent<HTMLFormElement>): void =>{
        e.preventDefault();
        const res= values;
        res.status= status;
        res.index= index;
        dispatch({type: "text", payload: res});
        setIsEditing(false);
    }

    const handleDrop= (e: DragEvent<HTMLParagraphElement>,index:number)=>{
    
            const data= e.dataTransfer.getData("text/plain");
            setBuilders(prev=>{
                const res= [...prev];
                res.splice(index,0,{data,id: nanoid()});
                return res;
            })
        }

  return (
    <div>
      <p className={`${styles.dropZone} ${isDragOverTop ? styles.dragOver : ''}`} 
      onDragOver={e=>{
        e.preventDefault()
        setIsDragOverTop(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragOverTop(false);
    }}
        onDrop={e=>{
            e.preventDefault();
            e.stopPropagation();
            setIsDragOverTop(false);
            handleDrop(e,index);
        }}></p>
      { isEditing ?
      <form  onSubmit={handleSubmit}>
        <p>
            <label htmlFor="label">Entry Label: </label>
            <input type="text" name="label" id="label" value={values.label} onChange={e=>setValues(prev=>({...prev,label:e.target.value, name: e.target.value}))} required />
        </p>
        <p>
            <label htmlFor='required'>Required: </label>
            <input type="checkbox" name='required' id='required' checked={values.required} onChange={e=>{
              setValues(prev=>({...prev,required: e.target.checked}))
            }
            }
               />
        </p>
        <button type='button' onClick={()=>setHasValidations(prev=>!prev)}>Add validations</button>
        {hasValidations &&
        <>
          <p>
            <label htmlFor="minLength">Minimum Length: </label>
            <input type="number" name='minLength' id="minLength" value={values.validation?.text?.minLength}  onChange={e=>{
              setValues(prev=>{
                const validation= prev.validation!;
                const text= validation?.text!;
                text.minLength= parseInt(e.target.value);
                validation.text= text;
                return {...prev, validation:validation};
              })
            }}/>
          </p>
          <p>
            <label htmlFor="maxLength">Maximum Length: </label>
            <input type="number" name='maxLength' id="maxLength" value={values.validation?.text?.maxLength} onChange={e=>{
              setValues(prev=>{
                const validation= prev.validation!;
                const text= validation?.text!;
                text.maxLength= parseInt(e.target.value);
                validation.text= text;
                return {...prev, validation:validation};
              })
            }}  />
          </p>
          <p>
            <label htmlFor="regex">Regex Pattern: </label>
            <input type="text" name='regex' id="regex" value={values.validation?.text?.regex} onChange={e=>{
              setValues(prev=>{
                const validation= prev.validation!;
                const text= validation?.text!;
                text.regex= e.target.value;
                validation.text= text;
                return {...prev, validation:validation};
              })
            }} />
          </p>
        </>
        }
        <button>Build</button>
      </form>
      :
      <main>
       <p>Text Input</p>
       <button onClick={()=>{
        setIsEditing(!isEditing)
        setStatus("edit");
       }}>Edit</button>
      </main>
    }
    <p className={`${styles.dropZone} ${isDragOverBottom ? styles.dragOver : ''}`} 
      onDragOver={e=>{
        e.preventDefault()
        setIsDragOverBottom(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragOverBottom(false);
    }}
        onDrop={e=>{
            e.preventDefault();
            e.stopPropagation();
            setIsDragOverBottom(false);
            handleDrop(e,index+1);
        }}></p>
    </div>
  )
}

export default TextBuilder
