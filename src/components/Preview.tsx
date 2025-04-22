import React from 'react'
import type { Layout, Option } from '../global.types';
import styles from "../styles/components/preview.module.css";
function Preview({layout}:{layout: Layout;}) {

    const handleSubmit= (e: React.FormEvent<HTMLFormElement>): void=>{
            e.preventDefault();
            const form= document.getElementById("builder") as HTMLFormElement;
            const formData= new FormData(form);
            let res= {};
            for(const [key,value] of formData){
                res= {...res, [key] : value||"NA"}
            }
            form.reset();
            window.alert(JSON.stringify(res,null,2));
        }

  return (
    <div className={`${styles.container} box-shadow`}>
        <h2>Preview</h2>
        {layout.length===0 &&
        <div className={`${styles.emptyPreview}`}>

            <p className={`${styles.emptyText}`}>Build to see preview</p>
        </div>
        }
      <form id="builder" onSubmit={handleSubmit}>
      {layout.map((input: any)=>{   // need to resolve the type error here

        const {type,name,label,required, validation, options,id}= input;

        const getValidationProps = ()=>{
            if(!validation) return {};
            let validationProps={};

            
            if(validation?.text){
                const {regex,maxLength, minLength}= validation.text;

                if(maxLength){
                    validationProps= {...validationProps, maxLength };
                }
                if(minLength){
                    validationProps= {...validationProps, minLength};
                }
                if(regex){
                    validationProps= {...validationProps, pattern: regex};
                }
            }
            return validationProps;
        }

        switch(type){
            case "text":
                return (
                    <p className={styles.formItem}  key={id}>
                        <label htmlFor={name}>{label}</label>
                        <input name={name} type={type} required={required}
                        {...getValidationProps()}
                        />
                    </p>
                ) 
            case "select":
                return (
                    <p className={styles.formItem} key={id}>
                        <label htmlFor={name}>{label}: </label>
                        <select name={name} required={required} >
                            {options.map((option: Option)=><option key={option.id} value={option.value}>{option.content}</option>)}
                        </select>
                    </p>
                )
            default: 
                return <></>
        }
        
      })}
      {layout.length>0 && <button>Submit</button>}
    </form>
    </div>
  )
}

export default Preview
