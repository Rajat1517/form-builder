import { type Dispatch, type FormEvent, useState, type DragEvent, type SetStateAction } from 'react'
import { type SelectionInput, type Action, type Option } from '../global.types';
import { nanoid } from 'nanoid';
import type { BiulderState } from '../pages/Builder';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import styles from "../styles/components/dropper.module.css"
import textStyles from "../styles/components/builders.module.css";

import ToggleOffIcon from "@mui/icons-material/ToggleOff"
import ToggleOnIcon from "@mui/icons-material/ToggleOn"

function SelectionBuilder({ dispatch, index, setBuilders }: { dispatch: Dispatch<Action>; index: number; setBuilders: Dispatch<SetStateAction<BiulderState[]>> }) {
    const [options, setOptions] = useState<Array<Option>>([]);
    const [addOption, setAddOption] = useState(true);
    const [option, setOption] = useState<Option | {}>({})
    const [commonError, setCommonError] = useState("");
    const [status, setStatus] = useState("build");
    const [id] = useState(nanoid());
    const [isEditing, setIsEditing] = useState(true);
    const [isDragOverTop, setIsDragOverTop] = useState(false);
    const [isDragOverBottom, setIsDragOverBottom] = useState(false);
    const [values, setValues] = useState<SelectionInput>({
        id,
        index,
        label: "",
        name: "",
        options: [],
        required: false,
        status,
        type: "select",
    })


    const handleAddOption = () => {
        setOptions(prev => [...prev, { ...option, id: String(Math.random() * 1000) } as Option])
        setOption({});
        setAddOption(false);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (options.length === 0) {
            setCommonError("No option added");
            setTimeout(() => setCommonError(""), 1000);
            return;
        }

        const res = values;
        res.status = status;
        res.options = options;
        res.index = index;

        dispatch({ type: "select", payload: res });
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

    const handleRemoveOption = (index: number) => {
        setOptions(prev => ([...prev.slice(0, index), ...prev.slice(index + 1)]));
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
                    <path d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z" stroke="#00000099" strokeWidth="2" strokeLinecap="round" />
                    <path d="M9 9L15 15" stroke="#00000099" strokeWidth="2" strokeLinecap="round" />
                    <path d="M15 9L9 15" stroke="#00000099" strokeWidth="2" strokeLinecap="round" />
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
                        <TextField type='text' fullWidth required name='label' id="label" value={values.label} label="Entry Label" variant="standard" onChange={e => setValues(prev => ({ ...prev, label: e.target.value, name: e.target.value }))} slotProps={{ htmlInput: { minLength: 0, maxLength: 255 } }} helperText="Label for your selection entry" />


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
                        <ul>
                            {options.map((option, index) => {
                                return (
                                    <li className={styles.options} key={option.id}>
                                        <span>{index + 1}: </span>
                                        <span>{option.value}</span>
                                        <button className={`${textStyles.iconButton} `} type='button' onClick={() => handleRemoveOption(index)}><svg className={`${styles.deleteIcon} ${styles.optionButton}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z" stroke="#00000099" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M9 9L15 15" stroke="#00000099" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M15 9L9 15" stroke="#00000099" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                        </button>
                                    </li>
                                )
                            })}
                            {!addOption && <p className={styles.placeholder} onClick={() => setAddOption(prev => !prev)}><em>Add option</em></p>}
                        </ul>
                        <div style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "0.3rem"
                        }}>
                            {addOption &&
                                <>
                                    <TextField type='text' required name='value' id="value" label="Value" variant="standard" onChange={(e) => setOption(prev => ({ ...prev, value: e.target.value }))} slotProps={{ htmlInput: { minLength: 0, maxLength: 255 } }} />
                                    <button disabled={Object.entries(option).length < 2} className={`${textStyles.iconButton} ${Object.entries(option).length < 2 ? styles.disabledIcon : styles.addIcon}`} type='button' onClick={handleAddOption}><svg className={styles.addIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="9" stroke="#007AD3" strokeWidth="2" />
                                        <path d="M12 15L12 9" stroke="#007AD3" strokeWidth="2" strokeLinecap="square" />
                                        <path d="M15 12L9 12" stroke="#007AD3" strokeWidth="2" strokeLinecap="square" />
                                    </svg>
                                    </button>
                                </>
                            }
                            {addOption && <button type="button" className={`${textStyles.iconButton}`} onClick={() => setAddOption(prev => !prev)} ><svg className={`${styles.cancelIcon}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="9" stroke="#00000099" strokeWidth="2" />
                                <path d="M7.5 12H16.5" stroke="#00000099" strokeWidth="2" />
                            </svg>
                            </button>}
                            <Button size='small' type='submit' color="primary" variant='contained' sx={{
                                display: "block", margin: "1rem 0 0 0"
                            }} >Build</Button>
                        </div>

                        <p style={{ color: "red" }}>{commonError}</p>
                    </form>
                </>
                :
                <main className={styles.form}>
                    <h4 className={`${textStyles.description}`}>{values.label}</h4>
                    <p className={`${textStyles.description}`}> {values.required ? "Mandatory" : ""} Selection Input as {options.map((option, index, arr) => {
                        return (
                            <span>{index === arr.length - 1 && arr.length>1 ? "and " : ""} {option.value}{index < arr.length - 2 ? ", " : " "}</span>
                        )
                    })}</p>
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

export default SelectionBuilder
