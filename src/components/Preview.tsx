import React, { useState } from 'react'
import type { Layout, ModalType, Option } from '../global.types';
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
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import LinkModal from './LinkModal';
import InfoModal from './InfoModal';

import { db } from "../styles/utils/firebase";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import type { User } from 'firebase/auth';

function Preview({ layout, formTitle, user }: { layout: Layout; formTitle: string; user: User | null }) {

    const [collapsed, setCollapsed] = useState(false);
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [formId, setFormId] = useState('');
    const [content, setContent] = useState<string | object>('');
    const [title, setTitle] = useState('');
    const [modalType, setModalType] = useState<ModalType>("submitted");
    const [isPublishing, setIsPublishing] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const form = document.getElementById("builder") as HTMLFormElement;
        const formData = new FormData(form);
        let res = {};
        for (const [key, value] of formData) {
            res = { ...res, [key]: value || "NA" }
        }
        form.reset();
        setModalType("submitted");
        setTitle("Sample Submission");
        setContent(res);
        setIsInfoModalOpen(true);
    }

    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPublishing(true);
        try {
            if (!navigator.onLine) {
                throw new Error("Internet is not connected!");
            }
            if (formTitle.trim() === "") throw new Error("Form is untitled");
            const docRef = await addDoc(collection(db, "forms"), {
                title: formTitle,
                layout,
                createdAt: serverTimestamp(),
                UID: user?.uid,
            });
            setFormId(docRef.id);
            setIsLinkModalOpen(true);
        } catch (error: unknown) {
            console.error("Error adding document: ", error);
            if (error instanceof Error) {
                setModalType("error");
                setTitle("Oops")
                setContent(`${error.message}`)
                setIsInfoModalOpen(true);
            }
        } finally {
            setIsPublishing(false);
        }
    }

    return (
        <div className={`${styles.container} box-shadow`}>
            <div className={styles.header}>
                <h2>Preview</h2>
                <button className={`${styles.toggler} ${collapsed ? styles.resting : styles.clockwise}`} onClick={() => {
                    setCollapsed(prev => !prev)
                }}>&#8250;</button>
            </div>
            <div className={`${styles.preview} ${collapsed ? styles.collapsed : styles.expanded}`}>
                {layout.length === 0 &&
                    <div className={`${styles.emptyPreview}`}>

                        <p className={`${styles.emptyText}`}>Build to see preview</p>
                    </div>
                }
                {layout.length > 0 && <TextField disabled sx={{ textAlign: "center" }} type='text' name='form-title' id="form-title" value={formTitle} variant="standard" slotProps={{ htmlInput: { minLength: 0, maxLength: 255 } }} />}
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
                                if (min && min !== null) {
                                    validationProps = { ...validationProps, min: min.toISOString().split("T")[0] };
                                }
                                if (max && max !== null) {
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
                                                {options.map((option: Option) => (<MenuItem value={option.value} key={option.id}>{option.value}</MenuItem>))}
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
                                                        label={option.value}
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                )
                            case "date":
                                return (
                                    <div key={id} className={styles.formItem}>
                                        <DatePicker label={label} name={name} required={required} {...getValidationProps()} />
                                    </div>
                                )
                            case "time":
                                return (
                                    <div key={id} className={styles.formItem}>
                                        <TimePicker label={label} name={name} required={required} {...getValidationProps()} />
                                    </div>
                                )
                            default:
                                return <></>
                        }

                    })}
                    {layout.length > 0 && <Button size='small' type='submit' color="primary" variant='contained' sx={{ margin: "0.5rem" }}>Submit</Button>}
                    {layout.length > 0 && <Button disabled={isPublishing || !user} title={!user ? "Sign In to publish" : "njll"} size='small' type='submit' color="primary" variant='contained' onClick={handlePublish} sx={{ margin: "0.5rem" }}>{isPublishing ? <span className={styles.loading}></span> : "Publish"}</Button>}
                </form>
            </div>
            <LinkModal open={isLinkModalOpen} handleClose={() => setIsLinkModalOpen(false)} formId={formId} />
            <InfoModal open={isInfoModalOpen} handleClose={() => setIsInfoModalOpen(false)} content={content} title={title} type={modalType} />
        </div>
    )
}

export default Preview
