import { type Dispatch, type FormEvent, useState } from 'react'
import { type SelectionInput, type Action, type Option } from '../global.types';
import { nanoid } from 'nanoid';



function SelectionBuilder({dispatch,index}:{dispatch: Dispatch<Action>; index:number}) {
    const [options,setOptions]= useState<Array<Option>>([]);
    const [addOption,setAddOption]= useState(false);
    const [option,setOption]= useState<Option|{}>({})
    const [commonError,setCommonError]= useState("");
    const [status,setStatus]= useState("build");
    const [id]= useState(nanoid());
    const [isEditing,setIsEditing]= useState(true);
    const handleAddOption= ()=>{
        setOptions(prev=> [...prev,{...option, id: String(Math.random()*1000)} as Option])
        setOption({});
        setAddOption(false);
    }

    const [values,setValues]= useState<SelectionInput>({
        id,
        index,
        label: "",
        name: "",
        options: [],
        required: false,
        status,
        type: "select",
    })

    const handleSubmit= (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(options.length===0){
            setCommonError("No selection option provided");
            setTimeout(()=>setCommonError(""),1000);
            return;
        }
        
        const res =values;
        res.status=status;
        res.options=options;

        dispatch({type: "select",payload: res});
        setIsEditing(false);
    }

    return (
        <div>
            {isEditing?
            <>
                <form onSubmit={handleSubmit}>
                    <p>
                        <label htmlFor='label'>Input Label: </label>
                        <input type="text" name='label' value={values.label} onChange={e=>setValues(prev=>( {...prev,name:e.target.value, label:e.target.value }))} required />
                    </p>
                    <p>
                        <label htmlFor='required'>Required: </label>
                        <input type="checkbox" name='required' checked={values.required} onChange={e=>setValues(prev=>({...prev,required:e.target.checked}))} />
                    </p>
                    <ul>
                        {options.map((option,index)=>{
                            return(
                                <li key={option.id}>
                                    <span>Option {index+1}: </span> 
                                    <span>{option.content}({option.value})</span>
                                </li>
                            )
                        })}
                    </ul>

                    {addOption &&
                    <>
                        <p>
                            <label htmlFor="content">Content</label>
                            <input type="text" name="content" onChange={(e)=> setOption(prev=>({...prev,content: e.target.value}))} />
                        </p>
                        <p>
                            <label htmlFor="value">Value</label>
                            <input type="text" name="value" onChange={(e)=> setOption(prev=>({...prev,value: e.target.value}))} />
                        </p>
                        <button type='button' onClick={handleAddOption}>Update Option</button>
                    </>
                    }
                    <button type='button' onClick={()=> setAddOption(prev=>!prev)} >Add Option</button>
                    <button>Build</button>
                </form>
                <p>{commonError}</p>
            </>
            : 
            <main>
                <p>Selection Input</p>
                <button onClick={()=>{
                    setIsEditing(!isEditing)
                    setStatus("edit");
                }}>Edit</button>
            </main>}
            
        </div>
    )
}

export default SelectionBuilder
