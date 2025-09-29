import { useState, type MouseEventHandler } from "react";
import styles from "../styles/components/lifter.module.css";
import type { BiulderState } from "../pages/Builder";
import type { User, } from "firebase/auth";

function Lifter({ builders, user, handleLogin, handleSignOut }: { builders: BiulderState[]; user: User | null; handleLogin: MouseEventHandler<HTMLButtonElement>; handleSignOut: MouseEventHandler<HTMLButtonElement>; }) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div className={`${styles.container}`}>
      <div className={styles.logo}>
        <svg width="21" height="27" viewBox="0 0 21 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M2.42308 1.58824C1.977 1.58824 1.61538 1.94377 1.61538 2.38235V24.6176C1.61538 25.0562 1.977 25.4118 2.42308 25.4118H18.5769C19.023 25.4118 19.3846 25.0562 19.3846 24.6176V7.41177H15.9519C14.6137 7.41177 13.5288 6.34515 13.5288 5.02941V1.58824H2.42308ZM15.1442 2.72689L18.258 5.82353H15.9519C15.5058 5.82353 15.1442 5.46799 15.1442 5.02941V2.72689ZM0 2.38235C0 1.06662 1.08485 0 2.42308 0H14.6738L21 6.29137V24.6176C21 25.9334 19.9152 27 18.5769 27H2.42308C1.08485 27 0 25.9334 0 24.6176V2.38235ZM4.84615 10.3235C4.84615 9.88495 5.20777 9.52941 5.65385 9.52941H15.3462C15.7922 9.52941 16.1538 9.88495 16.1538 10.3235C16.1538 10.7621 15.7922 11.1176 15.3462 11.1176H5.65385C5.20777 11.1176 4.84615 10.7621 4.84615 10.3235ZM4.84615 15.0882C4.84615 14.6497 5.20777 14.2941 5.65385 14.2941H15.3462C15.7922 14.2941 16.1538 14.6497 16.1538 15.0882C16.1538 15.5268 15.7922 15.8824 15.3462 15.8824H5.65385C5.20777 15.8824 4.84615 15.5268 4.84615 15.0882ZM4.84615 19.8529C4.84615 19.4144 5.20777 19.0588 5.65385 19.0588H10.5C10.9461 19.0588 11.3077 19.4144 11.3077 19.8529C11.3077 20.2915 10.9461 20.6471 10.5 20.6471H5.65385C5.20777 20.6471 4.84615 20.2915 4.84615 19.8529Z" fill="#007AD3" />
        </svg>
        <p>Form Builder</p>
      </div>
      <div className={`${styles.components} `}>
        <h3 className={`${styles.visible} ${styles.heading} ${builders.length === 0 && collapsed ? styles.hopper : ""}`} onClick={() => setCollapsed(prev => !prev)}>Components</h3>
        <div className={`${styles.lifter} ${collapsed ? styles.collapsed : styles.expanded}`}>
          <p draggable className={styles.draggable} onDragStart={e => {
            e.dataTransfer.setData("text/plain", "text")
          }}>Text Input</p>
          <p draggable className={styles.draggable} onDragStart={e => {
            e.dataTransfer.setData("text/plain", "select")
          }}>Selection Input</p>
          <p draggable className={styles.draggable} onDragStart={(e) => {
            e.dataTransfer.setData("text/plain", "radio");
          }}>Radio Input</p>
          <p draggable className={styles.draggable} onDragStart={(e) => {
            e.dataTransfer.setData("text/plain", "date");
          }}>Date Input</p>
          <p draggable className={styles.draggable} onDragStart={(e) => {
            e.dataTransfer.setData("text/plain", "time");
          }}>Time Input</p>
        </div>
        <div className={`${styles.lifterDesktop}`}>
          <p draggable className={styles.draggable} onDragStart={e => {
            e.dataTransfer.setData("text/plain", "text")
          }}>Text Input</p>
          <p draggable className={styles.draggable} onDragStart={e => {
            e.dataTransfer.setData("text/plain", "select")
          }}>Selection Input</p>
          <p draggable className={styles.draggable} onDragStart={(e) => {
            e.dataTransfer.setData("text/plain", "radio");
          }}>Radio Input</p>
          <p draggable className={styles.draggable} onDragStart={(e) => {
            e.dataTransfer.setData("text/plain", "date");
          }}>Date Input</p>
          <p draggable className={styles.draggable} onDragStart={(e) => {
            e.dataTransfer.setData("text/plain", "time");
          }}>Time Input</p>
        </div>
      </div>
      <div>

        {!user && <button className={styles.googleLogo} onClick={handleLogin}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
        </svg></button>}
        {user &&
          <>
            <img src={user.photoURL ?? ""} width="40" style={{ borderRadius: "100px" }} alt="profile" />
            <p>Hi {user.displayName}! </p>
            <button onClick={handleSignOut}>Logout</button>
          </>}
      </div>
    </div>
  )
}

export default Lifter
