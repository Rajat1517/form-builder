import { type ChangeEvent } from "react";
import styles from "../styles/components/datepicker.module.css";

type Props= {
    label: string;
    required?: boolean;
    min?: string;
    max?: string;
    name: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>)=>void;
};  

function DatePicker(props:Props) {
  return (
    <div style={{position: "relative", marginTop:"24px"}}>
      <input type="date" {...props} className={styles.dateInput}/>
      <label className={styles.dateLabel} htmlFor={props.name}>{props.label}{props.required?<span> &#42;</span>:""}</label>
    </div>
  )
}

export default DatePicker
