import { type Dispatch, type FormEvent, useState, type DragEvent, type SetStateAction } from 'react'
import type { Action, TimeInput } from '../global.types';
import { nanoid } from 'nanoid';
import { type BiulderState } from './Dropper';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import styles from "../styles/components/dropper.module.css"
import textStyles from "../styles/components/builders.module.css";
import ToggleOffIcon from "@mui/icons-material/ToggleOff"
import ToggleOnIcon from "@mui/icons-material/ToggleOn"

function TimeBuilder({ dispatch, index, setBuilders }: { dispatch: Dispatch<Action>; index: number; setBuilders: Dispatch<SetStateAction<BiulderState[]>> }) {


    const [status, setStatus] = useState("build");
    const [id] = useState(nanoid());
    const [hasValidations, setHasValidations] = useState(false);
    const [isEditing, setIsEditing] = useState(true);
    const [isDragOverTop, setIsDragOverTop] = useState(false);
    const [isDragOverBottom, setIsDragOverBottom] = useState(false);
    const [values, setValues] = useState<TimeInput>({
        id,
        index,
        label: "",
        name: "",
        required: false,
        status,
        type: "time",
        validation: {
            time: {
            }
        }
    })


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = values;
        res.status = status;
        res.index = index;
        dispatch({ type: "time", payload: res });
        setIsEditing(false);
    }

    const handleDrop = (e: DragEvent, index: number) => {
        const data = e.dataTransfer.getData("text/plain");
        setBuilders(prev => {
            const res = [...prev];
            res.splice(index, 0, { data, id: nanoid() });
            return res;
        })
    }

    const handleDelete = () => {
        const res = values;
        res.index = index;
        res.status = "default";
        setBuilders(prev => ([...prev.slice(0, index), ...prev.slice(index + 1)]));
        dispatch({ type: "delete", payload: res })
    }


    return (
        <>
            <p className={`${styles.dropZoneTop} ${isDragOverTop ? styles.dragOver : ''}`}
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
            <button className={`${textStyles.deleteButton} ${textStyles.iconButton}`}
                onClick={handleDelete}
            >
                <svg className={styles.deleteIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" />
                    <path d="M9 9L15 15" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" />
                    <path d="M15 9L9 15" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" />
                </svg>

            </button>
            {isEditing ?
                <>
                    <form className={styles.form} onSubmit={handleSubmit}
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
                        }}
                    >
                        <TextField type='text' fullWidth required name='label' id="label" value={values.label} label="Entry Label" variant="standard" onChange={e => setValues(prev => ({ ...prev, label: e.target.value, name: e.target.value }))} slotProps={{ htmlInput: { minLength: 0, maxLength: 255 } }} helperText="Label for your time entry" />


                        <FormControlLabel
                            sx={{
                                margin: "0",
                                padding: "0",
                                height: "2rem"
                            }}
                            control={
                                <Checkbox
                                    checked={values.required}
                                    onChange={e => { setValues(prev => ({ ...prev, required: e.target.checked })) }}
                                    icon={<ToggleOffIcon fontSize='large' />}
                                    checkedIcon={<ToggleOnIcon fontSize='large' />}
                                />
                            }
                            label="Required"
                            labelPlacement='start'
                        />

                        <FormControlLabel
                            sx={{
                                margin: "0",
                                padding: "0",
                                height: "2rem",
                            }}
                            control={
                                <Checkbox
                                    checked={hasValidations}
                                    onChange={() => {
                                        if (hasValidations) {
                                            let validation = values.validation;
                                            delete validation!.time!.min;
                                            delete validation!.time!.max;
                                            setValues(prev => ({ ...prev, validation }));
                                        }
                                        setHasValidations(prev => !prev)
                                    }}
                                    icon={<ToggleOffIcon fontSize='large' />}
                                    checkedIcon={<ToggleOnIcon fontSize='large' />}
                                />
                            }
                            label="Validations"
                            labelPlacement='start'
                        />
                        {hasValidations &&
                            <>
                                <p>
                                    <label htmlFor="min">Minimum Time: </label>
                                    <input type="time" name="min" value={values.validation?.time?.min} onChange={(e) => {
                                        let validation = values.validation;
                                        validation!.time!.min = e.target.value;
                                        setValues(prev => ({ ...prev, validation }));
                                    }} />
                                </p>
                                <p>
                                    <label htmlFor="max">Maximum Time: </label>
                                    <input type="time" name='max' value={values.validation?.time?.max} min={values.validation?.time?.min}
                                        onChange={(e) => {
                                            let validation = values.validation;
                                            validation!.time!.max = e.target.value;
                                            setValues(prev => ({ ...prev, validation }));
                                        }} />
                                </p>
                            </>
                        }
                        <Button size='small' type='submit' color="primary" variant='contained' sx={{ display: "block" }} >Build</Button>
                    </form>
                </>
                :
                <main className={styles.form}>
                   <h4 className={`${textStyles.description}`}>{values.label}</h4>
                    <p className={`${textStyles.description}`}> {values.required ? "Mandatory" : ""} Time Input</p>
                    <Button size='small' type='submit' color="primary" variant='contained' sx={{ display: "block" }} onClick={() => {
                        setIsEditing(!isEditing)
                        setStatus("edit");
                    }} >Edit</Button>
                </main>}
            <p className={`${styles.dropZoneDown} ${isDragOverBottom ? styles.dragOver : ''}`}
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

export default TimeBuilder
