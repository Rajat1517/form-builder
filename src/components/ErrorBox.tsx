function ErrorBox({error}:{error: string;}) {
  return (
    <div className=' error-container box-shadow'>
      <img className='error-image box-shadow' src={require("../assets/errorPage.jpg")} alt="Error Bot"/>
      <h3>Oops</h3>
      <p>{error}</p>
    </div>
  )
}

export default ErrorBox
