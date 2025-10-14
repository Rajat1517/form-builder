import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/userforms.module.css";
import { AuthContext } from "../contexts/authContext";
import { collection, getDocs, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import { db } from "../styles/utils/firebase";
import { Layout } from "../global.types";
import ErrorBox from "../components/ErrorBox"
import { Link } from "react-router";

type Form = {
  id: string;
  layout: Layout;
  title: string;
  uid: string;
}

function UserForms() {
  const [forms, setForms] = useState<Form[]>([]);
  const { user } = useContext(AuthContext);

  const loadForms = async () => {
    try {
      if (!user) return;

      const formsRef = collection(db, "forms");
      const q = query(formsRef, where("uid", "==", user?.uid ?? ""));
      const forms = await getDocs(q);
      const data = forms.docs.map((doc: QueryDocumentSnapshot) => ({
        id: doc.id,
        ...doc.data(),
      })) as Form[];
      setForms(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadForms();
  }, [user])

  return (
    <div className={styles.App}>
      <Navbar />
      <main className={styles.main}>
        {user ?
          <div className={styles.formList}>
            {forms.map((form: Form) => {
              console.log(form);
              return (
                <div key={form.id} className={styles.formContainer}>
                  <div>
                    <h3>{form.title}</h3>
                  </div>
                  <div>
                    <Link className={styles.link} to="#">Submissions <svg viewBox="0 0 16 16" className={styles.linkIcon} xmlns="http://www.w3.org/2000/svg" version="1.1" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polyline points="8.25 2.75,2.75 2.75,2.75 13.25,13.25 13.25,13.25 7.75"></polyline> <path d="m13.25 2.75-5.5 5.5m3-6.5h3.5v3.5"></path> </g></svg></Link>
                    <Link className={styles.link} to={`/forms/${form.id}`}>View Form <svg viewBox="0 0 16 16" className={styles.linkIcon} xmlns="http://www.w3.org/2000/svg" version="1.1" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polyline points="8.25 2.75,2.75 2.75,2.75 13.25,13.25 13.25,13.25 7.75"></polyline> <path d="m13.25 2.75-5.5 5.5m3-6.5h3.5v3.5"></path> </g></svg></Link>
                  </div>
                </div>
              )
            })}
          </div> :
          <ErrorBox error="Please login"/>
        }
      </main>
    </div>
  )
}

export default UserForms
