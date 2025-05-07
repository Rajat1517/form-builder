import React from 'react'
import type { Layout, Option } from '../global.types';
import styles from "../styles/components/preview.module.css";
import { TextField, FormControl, Select, MenuItem, InputLabel, Button } from '@mui/material';
function Preview({ layout }: { layout: Layout; }) {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const form = document.getElementById("builder") as HTMLFormElement;
        const formData = new FormData(form);
        let res = {};
        for (const [key, value] of formData) {
            res = { ...res, [key]: value || "NA" }
        }
        form.reset();
        window.alert(JSON.stringify(res, null, 2));
    }

    return (
        <div className={`${styles.container} box-shadow`}>
            <h2>Preview</h2>
            {layout.length === 0 &&
                <div className={`${styles.emptyPreview}`}>

                    <p className={`${styles.emptyText}`}>Build to see preview</p>
                </div>
            }
            <form id="builder" onSubmit={handleSubmit}>
                {layout.map((input: any) => {   // need to resolve the type error here

                    const { type, name, label, required, validation, options, id } = input;

                    const getValidationProps = () => {
                        if (!validation) return {};
                        let validationProps = {};


                        if (validation?.text) {
                            const { regex, maxLength, minLength } = validation.text;

                            if (maxLength) {
                                validationProps = { ...validationProps, maxLength };
                            }
                            if (minLength) {
                                validationProps = { ...validationProps, minLength };
                            }
                            if (regex) {
                                validationProps = { ...validationProps, pattern: regex };
                            }
                        }
                        return validationProps;
                    }

                    switch (type) {
                        case "text":
                            return (
                                <div key={id} className={`${styles.formItem}`}>
                                    <TextField type='text'
                                        fullWidth required={required} name={name} id="label" label={label} variant="standard" slotProps={{ htmlInput: { ...getValidationProps() } }} />
                                </div>
                            )
                        case "select":
                            return (
                                <div className={styles.formItem} key={id}>
                                    {/* <label htmlFor={name}>{label}: </label>
                                    <select name={name} required={required} >
                                        {options.map((option: Option) => <option key={option.id} value={option.value}>{option.content}</option>)}
                                    </select> */}
                                    <FormControl variant='standard' fullWidth>
                                        <InputLabel>{label}</InputLabel>
                                        <Select
                                            name={name}
                                            required={required}
                                            label={label}
                                        >
                                            {options.map((option: Option) => (<MenuItem value={option.value} key={option.id}>{option.content}</MenuItem>))}
                                        </Select>
                                    </FormControl>
                                </div>
                            )
                        case "radio":
                            return (
                                <p key={id} className={styles.formItem}>
                                    <label htmlFor={name}>{label}: </label>
                                    {options.map((option:Option)=>{
                                        return(
                                            <span key={option.id}>
                                                <label htmlFor={name} >{option.content}</label>
                                                <input type='radio' name={name} required={required} value={option.value} />
                                            </span>
                                        )
                                    })}

                                </p>
                            )
                        default:
                            return <></>
                    }

                })}
                {layout.length > 0 && <Button size='small' type='submit' color="primary" variant='contained' sx={{ margin: "0.5rem" }}>Submit</Button>}
            </form>
        </div>
    )
}

export default Preview
