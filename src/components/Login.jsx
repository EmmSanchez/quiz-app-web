import { useState, useRef, useEffect } from "react"
import { BrainIcon, ClipboardListIcon, CodeIcon, PlayIcon } from "../assets/icons/Icons"

// eslint-disable-next-line react/prop-types
export function DropdownMenu({children, options, title, id, activeDropdown, setActiveDropdown, selectedSettings, setSelectedSettings}) {
  const dropdownRef = useRef(null)

  const handleSelectOption = (e, selection, id) => {
    e.preventDefault()
    
    switch (id) {
      case "1" : { 
        setSelectedSettings(prev => ({...prev, topic: selection}))
        break; 
      }
      case "2" : { 
        setSelectedSettings(prev => ({...prev, difficult: selection}))
        break; 
      }
      case "3" : { 
        setSelectedSettings(prev => ({...prev, questions: selection}))
        break; 
      }
    } 
    
    setActiveDropdown(null)
  }

  const toggleDropdown = (e, id) => {
    e.preventDefault()
    if (activeDropdown === id) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(id)
    }
  }  

  useEffect(() => {
    const handleClickOutside = (event) => {
      // verify if the click is not inside the dropdownRef
      console.log(event.target);
      
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        console.log("out");
        setActiveDropdown(null);
      } else {
        console.log("in");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])

  return (
    <>
      <div className="flex flex-col">
        <button 
          onClick={(e) => toggleDropdown(e, id)}
          className={`flex justify-center items-center gap-2 w-48 border-solid border-[1px] border-zinc-700 px-4 py-2 rounded-md transition-all ease-out hover:bg-zinc-700 ${activeDropdown === id ? 'pointer-events-none' : 'pointer-events-auto'}`}
        >
          {children}
          <p>{title}</p>
        </button>

        <div className={`relative z-50 transition-all ease-in-out ${activeDropdown === id ? 'pointer-events-auto opacity-100' : 'USAR POINTER EVENST opacity-0 scale-90'}`}>
          <ul 
            ref={dropdownRef}
            className="absolute flex flex-col w-full mt-2 p-1 bg-zinc-950 rounded-md border-solid border-[1px] border-zinc-700"
          >
            {
              // eslint-disable-next-line react/prop-types
              options && options.map((option, index) => {
                return (
                  <li key={index} onClick={(e) => handleSelectOption(e, option, id)} className="px-4 py-1 rounded-sm transition hover:bg-zinc-800 hover:cursor-pointer">
                    <p>{option}</p>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </>
  )
}

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
  const dropdownOptions3 = ["5 Questions", "10 Questions", "15 Questions"];

  return (
    <>
      <header className="flex flex-col justify-center items-center max-w-4xl py-8">
        <h1 className="title text-center">Test Your <span className="text-amber-300 font-bold">Code Knowledge</span></h1>
        <p className="max-w-2xl text-center text-lg">
          Challenge yourself with quizzes designed to test your coding knowledge across languages and frameworks.
        </p>

        <section className="flex flex-col items-center w-auto mt-12 gap-4">
          <div className="flex flex-wrap w-full justify-center gap-4">
            <DropdownMenu options={dropdownOptions1} title={selectedSettings.topic} id="1" activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown} selectedSettings={selectedSettings} setSelectedSettings={setSelectedSettings}>
              <CodeIcon className="size-5"/>
            </DropdownMenu>
            <DropdownMenu options={dropdownOptions2} title={selectedSettings.difficult} id="2" activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} selectedSettings={selectedSettings} setSelectedSettings={setSelectedSettings}>
              <BrainIcon className="size-5"/>
            </DropdownMenu>
            <DropdownMenu options={dropdownOptions3} title={selectedSettings.questions} id="3" activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} selectedSettings={selectedSettings} setSelectedSettings={setSelectedSettings}>
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