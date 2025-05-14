import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import type { Layout, ModalType, Option } from "../global.types";
import InputLoader from "../components/InputLoader";
import TitleLoader from "../components/TitleLoader";
import styles from "../styles/publishedForm.module.css";
import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import DatePicker from "../components/DatePicker";
import TimePicker from "../components/TimePicker";
import InfoModal from "../components/InfoModal";
import ErrorBox from "../components/ErrorBox";



function PublishedForm() {
    const { formId } = useParams();
    const [layout, setLayout] = useState<Layout | null>(null);
    const [title, setTitle] = useState("");
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [content, setContent] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalType, setModalType] = useState<ModalType>("submitted");
    const [failed, setFailed] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const docRef = doc(db, "forms", formId!);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setTitle(data.title);
                    setLayout(data.layout);
                }
                else {
                    throw new Error(`No form with ID: ${formId} found!`);
                }
            } catch (error: unknown) {
                console.error("Error while loading the ", error)
                if (error instanceof Error) {
                    setError(error.message);
                }
                else setError("Error while loading the form, please try again later!")
                setFailed(true);
            }
        })();

    }, [formId]);

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
        setModalTitle("Sample Submission")
        setContent(`${JSON.stringify(res, null, "\n\n\n")}`);
        setIsInfoModalOpen(true);
    }


    return (
        <div className={styles.App}>
            {failed && <ErrorBox error={error} />}
            {!failed && <><h3 className={`${styles.title} box-shadow`}>
                {!title && <TitleLoader />}
                {title && <span>{title}</span>}
            </h3>
                <div className={`${styles.container} box-shadow`}>
                    {!layout &&
                        <>
                            <InputLoader />
                            <InputLoader />
                            <InputLoader />
                            <InputLoader />
                        </>}
                    {layout &&
                        <form id="builder" className={styles.form} onSubmit={handleSubmit}>
                            {layout!.map((input: any) => {   // need to resolve the type error here

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
                            {layout!.length > 0 && <Button size='small' type='submit' color="primary" variant='contained' sx={{ margin: "0.5rem" }}>Submit</Button>}
                        </form>}
                </div>
                <InfoModal open={isInfoModalOpen} handleClose={() => setIsInfoModalOpen(false)} content={content} title={modalTitle} type={modalType} />
            </>}
        </div>
    )
}

export default PublishedForm
