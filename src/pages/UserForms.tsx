import { useCallback, useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/userforms.module.css";
import { AuthContext } from "../contexts/authContext";
import { collection, getDocs, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import { db } from "../styles/utils/firebase";
import { Layout } from "../global.types";
import { Link } from "react-router";

type Form= {
  id: string;
  layout: Layout;
  title: string;
  uid: string;
}

function UserForms() {
  const [forms,setForms]= useState<Form[]>([]);
  const { user } = useContext(AuthContext);

  const loadForms= async ()=>{
    try{
      if(!user) return;

      const formsRef= collection(db, "forms");
      const q= query(formsRef,where("uid","==", user?.uid ?? ""));  
      const forms= await getDocs(q);
      const data= forms.docs.map((doc: QueryDocumentSnapshot)=>({
        id: doc.id,
        ...doc.data(),
      })) as Form[];
      setForms(data);
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    loadForms();
  },[user])

  return (
    <div className={styles.App}>
      <Navbar />
      {user? 
      <div>
        {forms.map((form:Form)=>{
          console.log(form);
          return(
            <div key={form.id}>
              <p>{form.title}</p>
              <button>View Submissions</button>
              <Link to={`/forms/${form.id}`}>View Form</Link>
            </div>
          )
        })}
      </div>:
      <div>
        Please Login
      </div>
      }
    </div>
  )
}

export default UserForms
