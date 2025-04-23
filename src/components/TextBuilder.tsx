import React, { useState, type FormEvent, type DragEvent } from 'react'
import type { Dispatch, SetStateAction } from 'react';
import type { Action, TextInput } from "../global.types";
import { nanoid } from 'nanoid';
import styles from "../styles/components/dropper.module.css"
import type { BiulderState } from './Dropper';
import textStyles from "../styles/components/textBuilder.module.css";
import { Button, TextField } from '@mui/material';


function TextBuilder({ dispatch, index, setBuilders }: { dispatch: React.Dispatch<Action>; index: number; setBuilders: Dispatch<SetStateAction<BiulderState[]>> }) {
  const [hasValidations, setHasValidations] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [status, setStatus] = useState("build");
  const [id] = useState(nanoid());
  const [values, setValues] = useState<TextInput>({
    name: "",
    label: "",
    id,
    index,
    required: false,
    status,
    type: "text",
    validation: {
      text: {
        maxLength: 0,
        minLength: 0,
        regex: "",
      }
    }
  });
  const [isDragOverTop, setIsDragOverTop] = useState(false);
  const [isDragOverBottom, setIsDragOverBottom] = useState(false);
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const res = values;
    res.status = status;
    res.index = index;
    dispatch({ type: "text", payload: res });
    setIsEditing(false);
  }

  const handleDrop = (e: DragEvent<HTMLParagraphElement>, index: number) => {

    const data = e.dataTransfer.getData("text/plain");
    setBuilders(prev => {
      const res = [...prev];
      res.splice(index, 0, { data, id: nanoid() });
      return res;
    })
  }

  return (
    <>
      <p className={`${styles.dropZone} ${isDragOverTop ? styles.dragOver : ''}`}
        onDragOver={e => {
          e.preventDefault()
          setIsDragOverTop(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragOverTop(false);
        }}
        onDrop={e => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragOverTop(false);
          handleDrop(e, index);
        }}></p>
      <button className={`${textStyles.deleteButton}`}>x</button>
      {isEditing ?
        <form onSubmit={handleSubmit}>
          <TextField type='text' fullWidth required name='label' id="label" value={values.label} label="Entry Label" variant="standard" onChange={e => setValues(prev => ({ ...prev, label: e.target.value, name: e.target.value }))} slotProps={{ htmlInput: { minLength: 0, maxLength: 255 } }} helperText="Label for your form entry" />
          <p>
            <label htmlFor='required'>Required: </label>
            <input type="checkbox" name='required' id='required' checked={values.required} onChange={e => {
              setValues(prev => ({ ...prev, required: e.target.checked }))
            }
            }
            />
          </p>
          <button type='button' onClick={() => setHasValidations(prev => !prev)}>Add validations</button>
          {hasValidations &&
            <>
              <TextField type='number' fullWidth name='minLength' id="minLength" value={values.validation?.text?.minLength} label="Minimum Length" variant="standard" onChange={e => {
                setValues(prev => {
                  const validation = prev.validation!;
                  const text = validation?.text!;
                  text.minLength = parseInt(e.target.value);
                  validation.text = text;
                  return { ...prev, validation: validation };
                })
              }}
                slotProps={{
                  htmlInput: {
                    min: 0,
                    max: 255
                  }
                }} />
              <TextField type='number' fullWidth name='maxLength' id="maxLength" value={values.validation?.text?.maxLength} label="Maximum Length" variant="standard" onChange={e => {
                setValues(prev => {
                  const validation = prev.validation!;
                  const text = validation?.text!;
                  text.maxLength = parseInt(e.target.value);
                  validation.text = text;
                  return { ...prev, validation: validation };
                })
              }}
                slotProps={{
                  htmlInput: {
                    min: 0,
                    max: 255
                  }
                }} />
              <TextField type='text' fullWidth name='regex' id="regex" value={values.validation?.text?.regex} label="Regex Pattern" variant="standard" onChange={e => {
                setValues(prev => {
                  const validation = prev.validation!;
                  const text = validation?.text!;
                  text.regex = e.target.value;
                  validation.text = text;
                  return { ...prev, validation: validation };
                })
              }}
                slotProps={{
                  htmlInput: {
                    minLength: 0,
                    maxLength: 255
                  }
                }} />
            </>
          }
          <Button size='small' type='submit' color="primary" variant='contained' sx={{ display: "block" }} >Build</Button>
        </form>
        :
        <main>
          <p>A {values.required && `mandatory`} text input aganinst the label- "{values.label}"</p>
          <Button size='small' type='submit' color="primary" variant='contained' sx={{ display: "block" }} onClick={() => {
            setIsEditing(!isEditing)
            setStatus("edit");
          }} >Edit</Button>
        </main>
      }
      <p className={`${styles.dropZone} ${isDragOverBottom ? styles.dragOver : ''}`}
        onDragOver={e => {
          e.preventDefault()
          setIsDragOverBottom(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragOverBottom(false);
        }}
        onDrop={e => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragOverBottom(false);
          handleDrop(e, index + 1);
        }}></p>
    </>
  )
}

export default TextBuilder
