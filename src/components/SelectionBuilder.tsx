import { type Dispatch, type FormEvent, useState } from 'react'
import { type SelectionInput, type Action, type Option } from '../global.types';
import { nanoid } from 'nanoid';
import { Button, TextField } from '@mui/material';


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
                    <TextField type='text' fullWidth required name='label' id="label" value={values.label} label="Entry Label" variant="standard" onChange={e => setValues(prev => ({ ...prev, label: e.target.value, name: e.target.value }))} slotProps={{ htmlInput: { minLength: 0, maxLength: 255 } }} helperText="Label for your form entry" />
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
                        <TextField type='text' required name='content' id="content" label="Content" variant="standard" onChange={(e)=> setOption(prev=>({...prev,content: e.target.value}))}slotProps={{ htmlInput: { minLength: 0, maxLength: 255 } }} />
                        <TextField type='text' required name='value' id="value" label="Value" variant="standard" onChange={(e)=> setOption(prev=>({...prev,value: e.target.value}))} slotProps={{ htmlInput: { minLength: 0, maxLength: 255 } }} />
                        <button type='button' onClick={handleAddOption}>Update Option</button>
                    </>
                    }
                    {!addOption && <button type='button' onClick={()=> setAddOption(prev=>!prev)} >Add Option</button>}
                    <button>Build</button>
                </form>
                <p style={{color: "red"}}>{commonError}</p>
            </>
            : 
            <main>
                <p>Selection Input</p>
                <Button size='small' type='submit' color="primary" variant='contained' sx={{ display: "block" }} onClick={() => {
                    setIsEditing(!isEditing)
                    setStatus("edit");
                }} >Edit</Button>
            </main>}
            
        </div>
    )
}

export default SelectionBuilder
