/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react"

export function DropdownMenu({
  children, 
  options, 
  title, 
  id, 
  activeDropdown, 
  setActiveDropdown,  
  setSelectedSettings, 
  // dropdownRef
}) {

  const dropdownRef = useRef()


  const handleSelectOption = (e, selection, id) => {
    e.preventDefault()
    e.stopPropagation()
    
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
    e.stopPropagation()

    if (activeDropdown !== id) {
      setActiveDropdown(id)
    }
  }  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown === null) return

      // verify if the click is not inside the dropdownRef
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    }
  }, [activeDropdown])
  
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

        <div ref={dropdownRef} className={`${activeDropdown === id ? 'modal-opened' : 'modal-hidden'}`}>
          <ul
            
            className="absolute flex flex-col w-full mt-2 p-1 bg-zinc-950 rounded-md border-solid border-[1px] border-zinc-700"
          >
            {
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