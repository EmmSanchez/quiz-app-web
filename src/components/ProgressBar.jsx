/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { CheckIcon } from "../assets/icons/Icons";

const createArrayUpTo = (questions) => {
  let sortedArrayNumber = []
  for (let i = 1; i <= questions; i++) {
    sortedArrayNumber.push(i)
  }
  return sortedArrayNumber;
}

export function ProgressBar({answeredQuestions, totalQuestions}) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const newProgress = ((answeredQuestions + 1) / totalQuestions * 100);
    setProgress(newProgress)
  }, [answeredQuestions])


  const questionsArray = createArrayUpTo(totalQuestions)
  
  return (
    <div className="relative w-full px-6 mb-6">
      <div className="relative w-full h-2 rounded-full bg-zinc-900">
        <div style={{width: `${progress}%` }} className="h-2 bg-[#ffff3f] rounded-full transition-all ease-in-out duration-300"></div>
        
        {/* Points Steps */}
        <div className="absolute -top-2 flex w-full justify-around">
          {
            questionsArray && questionsArray.map((questionNumber, index) => {
              return (
                <div key={index} className="flex flex-1 justify-end transition-all duration-100">
                  {
                    index < answeredQuestions ?
                    <>
                      <CheckIcon className="size-6 p-[4px] rounded-full bg-[#ffff3f] text-zinc-900 transition"/>
                    </>
                    :
                    <>
                      <p className={`text-md px-2 rounded-full text-zinc-100 font-medium transition ease-in ${index <= answeredQuestions ? 'delay-150 bg-[#ffff3f] text-zinc-900' : 'bg-zinc-900'} ${index === answeredQuestions ? 'scale-110' : 'scale-100'}`}>
                        {questionNumber}
                      </p>
                    </>
                  }
                </div>
              )
            })
          }
        </div>


      </div>
    </div>
  )
}