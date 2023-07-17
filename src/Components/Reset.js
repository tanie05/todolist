import React from 'react'

const  Reset = () => {


  function reset() {
    
    localStorage.clear()
    window.location.reload(false);
    
  }
    

  return (
    <div>
      <button className= "btn" onClick={reset}>Reset</button>
    </div>
  )
}
export default Reset;

