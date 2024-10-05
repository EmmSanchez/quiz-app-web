import { useState } from "react"
import { Quiz } from "./Quiz"
import { Login } from "./Login"
import { NavBar } from "./NavBar"
import { Footer } from "./Footer"
import { getRandomQuestions } from "../utils/random"
import questions from "../data/data.json"

export function AppContainer() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedSettings, setSelectedSettings] = useState(
    {
      topic: "JavaScript",
      difficult: "Easy",
      questions: 5,
      secondsPerQuestion: 60
    }
  )
  const [filteredQuestions, setFilteredQuestions] = useState([])


  const handleSubmit = () => {
    setIsSubmitted(true)
    const newQuestions = getRandomQuestions(0, questions.length - 1, selectedSettings.questions, questions)
    setFilteredQuestions(newQuestions)
  }

  console.log(filteredQuestions);
  

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <NavBar />
      {isSubmitted ? <Quiz setIsSubmitted={setIsSubmitted} selectedSettings={selectedSettings} filteredQuestions={filteredQuestions} handleSubmit={handleSubmit}/> : <Login handleSubmit={handleSubmit} selectedSettings={selectedSettings} setSelectedSettings={setSelectedSettings}/>}
      <Footer />

      <div className="fixed inset-0 -z-10 h-full w-dvw items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_55%,#003566_100%)]"></div>
    </div>
  )
}
