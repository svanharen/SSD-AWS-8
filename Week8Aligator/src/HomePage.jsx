import { useState } from 'react'
import reactLogo from './assets/react.svg'
import * as cognito from './cognito'

function HomePage({ onSubmit }) {
  const [count, setCount] = useState(0)



  return (
    <div className="App">
      <h1>HomePage</h1>
      <button className= "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-5 rounded focus:outline-none focus:shadow-outline" 
                    onClick={()=> onSubmit()}>Logout</button>
    </div>
  )
}

export default HomePage
