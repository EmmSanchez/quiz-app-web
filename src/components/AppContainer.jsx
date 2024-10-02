import { useState } from "react"
import { Quiz } from "./Quiz"
import { Login } from "./Login"
import { NavBar } from "./NavBar"

export function AppContainer() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <>
      <NavBar className="bg-amber-400"/>
      
      {isSubmitted ? <Quiz setIsSubmitted={setIsSubmitted}/> : <Login handleSubmit={handleSubmit}/>}

      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_55%,#003566_100%)]"></div>
    </>
  )
}
