import React, { useState } from 'react'
import type { Layout, Option } from '../global.types';
import styles from "../styles/components/preview.module.css";
import {
    TextField,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel
} from '@mui/material';

function Preview({ layout }: { layout: Layout; }) {

    const [collapsed, setCollapsed] = useState(false);

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
            <div className={styles.header}>
                <h2>Preview</h2>
                <button className={styles.toggler} onClick={() => {
                    setCollapsed(prev => !prev)
                }}>&#9776;</button>
            </div>
            <div className={`${styles.preview} ${collapsed ? styles.collapsed : styles.expanded}`}>
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

                            if (validation?.date) {
                                const { min, max } = validation.date;
                                if (min) {
                                    validationProps = { ...validationProps, min: min.toISOString().split("T")[0] };
                                }
                                if (max) {
                                    validationProps = { ...validationProps, max: max.toISOString().split("T")[0] };
                                }
                            }

                            if (validation?.time) {
                                const { min, max } = validation.time;
                                if (min) {
                                    validationProps = { ...validationProps, min };
                                }
                                if (max) validationProps = { ...validationProps, max };
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
                                    <div key={id} className={styles.formItem}>
                                        <FormControl variant="standard" fullWidth>
                                            <FormLabel>{label}</FormLabel>
                                            <RadioGroup
                                                name={name}
                                                row
                                            >
                                                {options.map((option: Option) => (
                                                    <FormControlLabel
                                                        key={option.id}
                                                        value={option.value}
                                                        control={<Radio required={required} />}
                                                        label={option.content}
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                )
                            case "date":
                                return (
                                    <div key={id} className={styles.formItem}>
                                        <label htmlFor={name}>{label}: </label>
                                        <input type="date" name={name} required={required} {...getValidationProps()} />
                                    </div>
                                )
                            case "time":
                                return (
                                    <div key={id} className={styles.formItem}>
                                        <label htmlFor={name}>{label}: </label>
                                        <input type='time' name={name} required={required} {...getValidationProps()} />
                                    </div>
                                )
                            default:
                                return <></>
                        }

                    })}
                    {layout.length > 0 && <Button size='small' type='submit' color="primary" variant='contained' sx={{ margin: "0.5rem" }}>Submit</Button>}
                </form>
            </div>
        </div>
    )
}

export default Preview
