import { useState } from "react"
import { Quiz } from "./Quiz"
import { Login } from "./Login"
import { NavBar } from "./NavBar"
import { Footer } from "./Footer"

export function AppContainer() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <NavBar />
      {isSubmitted ? <Quiz setIsSubmitted={setIsSubmitted}/> : <Login handleSubmit={handleSubmit}/>}
      <Footer />

      <div className="fixed inset-0 -z-10 h-full w-dvw items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_55%,#003566_100%)]"></div>
    </div>
  )
}
