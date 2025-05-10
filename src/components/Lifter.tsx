import styles from "../styles/components/lifter.module.css";
function Lifter() {
  return (
    <div className={`${styles.container}`}>
      <div className={styles.logo}>
        <svg width="21" height="27" viewBox="0 0 21 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M2.42308 1.58824C1.977 1.58824 1.61538 1.94377 1.61538 2.38235V24.6176C1.61538 25.0562 1.977 25.4118 2.42308 25.4118H18.5769C19.023 25.4118 19.3846 25.0562 19.3846 24.6176V7.41177H15.9519C14.6137 7.41177 13.5288 6.34515 13.5288 5.02941V1.58824H2.42308ZM15.1442 2.72689L18.258 5.82353H15.9519C15.5058 5.82353 15.1442 5.46799 15.1442 5.02941V2.72689ZM0 2.38235C0 1.06662 1.08485 0 2.42308 0H14.6738L21 6.29137V24.6176C21 25.9334 19.9152 27 18.5769 27H2.42308C1.08485 27 0 25.9334 0 24.6176V2.38235ZM4.84615 10.3235C4.84615 9.88495 5.20777 9.52941 5.65385 9.52941H15.3462C15.7922 9.52941 16.1538 9.88495 16.1538 10.3235C16.1538 10.7621 15.7922 11.1176 15.3462 11.1176H5.65385C5.20777 11.1176 4.84615 10.7621 4.84615 10.3235ZM4.84615 15.0882C4.84615 14.6497 5.20777 14.2941 5.65385 14.2941H15.3462C15.7922 14.2941 16.1538 14.6497 16.1538 15.0882C16.1538 15.5268 15.7922 15.8824 15.3462 15.8824H5.65385C5.20777 15.8824 4.84615 15.5268 4.84615 15.0882ZM4.84615 19.8529C4.84615 19.4144 5.20777 19.0588 5.65385 19.0588H10.5C10.9461 19.0588 11.3077 19.4144 11.3077 19.8529C11.3077 20.2915 10.9461 20.6471 10.5 20.6471H5.65385C5.20777 20.6471 4.84615 20.2915 4.84615 19.8529Z" fill="#007AD3" />
        </svg>
        <p>Form Builder</p>
      </div>


      <h2>Components</h2>
      <p draggable onDragStart={e => {
        e.dataTransfer.setData("text/plain", "text")
      }}>Text Input</p>
      <p draggable onDragStart={e => {
        e.dataTransfer.setData("text/plain", "select")
      }}>Selection Input</p>
      <p draggable onDragStart={(e)=>{
        e.dataTransfer.setData("text/plain","radio");
      }}>Radio Input</p>
      <p draggable onDragStart={(e)=>{
        e.dataTransfer.setData("text/plain","date");
      }}>Date Input</p>
    </div>
  )
}

export default Lifter
