import { type ChangeEvent } from "react";
import styles from "../styles/components/timePicker.module.css";

type Props= {
    label: string;
    required?: boolean;
    min?: string;
    max?: string;
    name: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>)=>void;
};  

function TimePicker(props:Props) {
  return (
    <div style={{position: "relative", marginTop:"24px"}}>
      <input type="time" {...props} className={styles.timeInput}/>
      <label className={styles.timeLabel} htmlFor={props.name}>{props.label}{props.required?<span> &#42;</span>:""}</label>
    </div>
  )
}

export default TimePicker
