import { useState } from "react"
import { BrainIcon, ClipboardListIcon, CodeIcon, PlayIcon } from "../assets/icons/Icons"
import { DropdownMenu } from "./Dropdown"

// eslint-disable-next-line react/prop-types
export function Login ({ handleSubmit }) {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [selectedSettings, setSelectedSettings] = useState(
    {
      topic: "JavaScript",
      difficult: "Easy",
      questions: "10 Questions",
      secondsPerQuestion: "60"
    }
  )

  const dropdownOptions1 = ["JavaScript", "Python", "Rust"];
  const dropdownOptions2 = ["Easy", "Medium", "Hard"];
  const dropdownOptions3 = ["5 Questions", "10 Questions", "15 Questions", "20 Questions"];

  return (
    <>
      <header className="flex flex-col justify-center items-center max-w-4xl py-8">
        <h1 className="title text-center">Test Your <span className="text-amber-300 font-bold">Code Knowledge</span></h1>
        <p className="max-w-2xl text-center text-lg">
          Challenge yourself with quizzes designed to test your coding knowledge across languages and frameworks.
        </p>

        <section className="flex flex-col items-center w-auto mt-12 gap-4">
          <div className="flex flex-wrap w-full justify-center gap-4">
            <DropdownMenu 
              options={dropdownOptions1} 
              title={selectedSettings.topic} 
              id="1" 
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown} 
              selectedSettings={selectedSettings} 
              setSelectedSettings={setSelectedSettings}
            >
              <CodeIcon className="size-5"/>
            </DropdownMenu>
            <DropdownMenu 
              options={dropdownOptions2} 
              title={selectedSettings.difficult} 
              id="2" 
              activeDropdown={activeDropdown} 
              setActiveDropdown={setActiveDropdown} 
              selectedSettings={selectedSettings} 
              setSelectedSettings={setSelectedSettings}
            >
              <BrainIcon className="size-5"/>
            </DropdownMenu>
            <DropdownMenu 
              options={dropdownOptions3} 
              title={selectedSettings.questions} 
              id="3" 
              activeDropdown={activeDropdown} 
              setActiveDropdown={setActiveDropdown} 
              selectedSettings={selectedSettings} 
              setSelectedSettings={setSelectedSettings}
            >
              <ClipboardListIcon className="size-5"/>
            </DropdownMenu>
          </div>

          <button onClick={handleSubmit} className="flex justify-center items-center w-full mt-4 py-3 gap-3 bg-amber-300 text-zinc-900 text-xl font-bold rounded-md transition hover:bg-[#B09437]">
            <PlayIcon />
            Start Quiz
          </button>
        </section>
      </header>
    </>
  )
}