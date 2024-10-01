import { useState, useEffect } from "react"
import { Quiz } from "./Quiz"
import { Login } from "./login"

export function AppContainer() {
  const [user, setUser] = useState('')
  const [status, setStatus] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const newUser = e.target.value
    setUser(newUser)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  useEffect(() => {
    user.length > 2 ? setStatus(false) : setStatus(true)
  }, [user])

  return (
    <>
      {isSubmitted ? <Quiz user={user} setIsSubmitted={setIsSubmitted}/> : <Login handleChange={handleChange} handleSubmit={handleSubmit} status={status}/>}
      
    </>
  )
}
