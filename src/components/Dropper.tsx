import { type Dispatch, useState, type DragEvent, SetStateAction } from 'react'
import TextBuilder from './builders/TextBuilder';
import SelectionBuilder from './builders/SelectionBuilder';
import RadioBuilder from './builders/RadioBuilder';
import DateBuilder from './builders/DateBuilder';
import styles from "../styles/components/dropper.module.css"
import { Action } from '../global.types';
import { nanoid } from 'nanoid';
import TimeBuilder from './builders/TimeBuilder';
import { TextField } from '@mui/material';
import type { BiulderState } from '../pages/Builder';

type Props = {
    dispatch: Dispatch<Action>;
    formTitle: string;
    setFormTitle: Dispatch<SetStateAction<string>>;
    builders: BiulderState[];
    setBuilders: Dispatch<SetStateAction<BiulderState[]>>;
}


function Dropper({ dispatch, formTitle, setFormTitle, builders, setBuilders }: Props) {


    const [collapsed, setCollapsed] = useState(false);

    const handleDrop = (e: DragEvent<HTMLParagraphElement>, index: number) => {

        const data = e.dataTransfer.getData("text/plain");
        setBuilders((prev) => {
            const res = [...prev];
            res.splice(index + 1, 0, { data, id: nanoid() });
            return res;
        })
    }

    const renderBuilder = (builder: BiulderState, index: number) => {
        switch (builder.data) {
            case "text":
                return (
                    <TextBuilder dispatch={dispatch} index={index} setBuilders={setBuilders} />)
            case "select":
                return (<>
                    <SelectionBuilder dispatch={dispatch} index={index} setBuilders={setBuilders} />
                </>)
            case "radio":
                return (
                    <><RadioBuilder dispatch={dispatch} index={index} setBuilders={setBuilders} /></>
                )
            case "date":
                return (
                    <DateBuilder dispatch={dispatch} index={index} setBuilders={setBuilders} />
                )
            case "time":
                return (
                    <TimeBuilder dispatch={dispatch} index={index} setBuilders={setBuilders} />
                )
            default:
                return null
        }
    }

    return (
        <div className={`${styles.container} box-shadow`} onDragOver={(e) => { e.preventDefault(); }}
            onDrop={e => {
                e.preventDefault();
                handleDrop(e, 0);
            }}
        >

            <header className={`${styles.header}`}>
                <h2>Builder</h2>
                <button className={`${styles.toggler} ${collapsed ? styles.resting : styles.clockwise}`} onClick={() => {
                    setCollapsed(prev => !prev)
                }}>&#8250;</button>
            </header>
            <div className={`${styles.catcher} ${collapsed ? styles.collapsed : styles.expanded}`}>
                {builders.length === 0 &&
                    <div className={`${styles.emptyDrop}`}>
                        <svg className={`${styles.emptyIcon}`} viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.6967 5.625H16.875C13.3395 5.625 11.5717 5.625 10.4733 6.72335C9.375 7.8217 9.375 9.58947 9.375 13.125V31.875C9.375 35.4105 9.375 37.1783 10.4733 38.2766C11.5717 39.375 13.3395 39.375 16.875 39.375H28.125C31.6605 39.375 33.4283 39.375 34.5266 38.2766C35.625 37.1783 35.625 35.4105 35.625 31.875V16.5533C35.625 15.7869 35.625 15.4037 35.4823 15.0591C35.3395 14.7145 35.0686 14.4436 34.5267 13.9017L27.3484 6.72335C26.8064 6.18142 26.5355 5.91045 26.1909 5.76773C25.8463 5.625 25.4631 5.625 24.6967 5.625Z" stroke="#007AD3" strokeWidth="2" />
                            <path d="M24.375 5.625V13.125C24.375 14.8928 24.375 15.7767 24.9242 16.3258C25.4733 16.875 26.3572 16.875 28.125 16.875H35.625" stroke="#007AD3" strokeWidth="2" />
                            <path d="M22.375 29.625L21.6679 30.3321L22.375 31.0392L23.0821 30.3321L22.375 29.625ZM23.375 20.25C23.375 19.6977 22.9273 19.25 22.375 19.25C21.8227 19.25 21.375 19.6977 21.375 20.25L23.375 20.25ZM17.6875 24.9375L16.9804 25.6446L21.6679 30.3321L22.375 29.625L23.0821 28.9179L18.3946 24.2304L17.6875 24.9375ZM22.375 29.625L23.0821 30.3321L27.7696 25.6446L27.0625 24.9375L26.3554 24.2304L21.6679 28.9179L22.375 29.625ZM22.375 29.625L23.375 29.625L23.375 20.25L22.375 20.25L21.375 20.25L21.375 29.625L22.375 29.625Z" fill="#007AD3" />
                            <path d="M16.9062 33.5312L27.8438 33.5313" stroke="#007AD3" strokeWidth="2" />
                        </svg>

                        <p className={`${styles.emptyText}`}>Drag and drop your component</p>
                    </div>
                }
                {builders.length > 0 && <TextField sx={{ textAlign: "center" }} type='text' required name='form-title' id="form-title" value={formTitle} variant="standard" onChange={(e) => {
                    setFormTitle(e.target.value)
                }} slotProps={{ htmlInput: { minLength: 0, maxLength: 255 } }} />}
                {
                    builders.map((builder, index) => {

                        return (<div key={builder.id} className={`${styles.formItem}  ${styles.builderCard}`}
                        >
                            {renderBuilder(builder, index)}
                        </div>)

                    })
                }
            </div>
        </div>
    )
}



export default Dropper
