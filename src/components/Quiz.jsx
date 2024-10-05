/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react"
import { CheckCircle, CircleX, TimerIcon } from "../assets/icons/Icons"
import { ProgressBar } from "./ProgressBar"
import { Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

export function Quiz({user, setIsSubmitted, selectedSettings, filteredQuestions, handleSubmit}) {
  const [iterator, setIterator] = useState(0)
  const [rightCounter, setRightCounter] = useState(0)
  const [wrongCounter, setWrongCounter] = useState(0)
  const [isNotChecked, setIsNotChecked] = useState(true)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [countdown, setCountdown] = useState(15)
  const [timeLeft, setTimeLeft] = useState(0)
  const timerId = useRef()

  const [isFinished, setIsFinished] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [isRestarted, setIsRestarted] = useState(false)

  const codeString = "const fruits = ['apple', 'banana'];\nfruits.push('orange')\nfruits.push('orange')\nfruits.push('orange')\nfruits.push('orange')\nfruits.push('orange')"

  // TIMER --------------------------------------------------------------------------
  useEffect(() => {
    timerId.current = setInterval(() => {
      if (countdown >= 0) {
        setCountdown(prev => prev - 1)
      }
    }, 1000)
    return () => clearInterval(timerId.current);

  }, [countdown])

  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(timerId.current)
      setCountdown(0)
      if (isNotChecked) {
        setWrongCounter((prev) => prev + 1);
        setIsNotChecked(false)
      } else {
        setIsNotChecked(false)
      }
    }
  }, [countdown])

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
  }

  const handleNextQuestion = () => {
    if(iterator < filteredQuestions.length - 1) {
      setIterator(iterator + 1)
    } else {
      setIsFinished(true)
    }
    setSelectedAnswer(null)
  }

  const handleCheckAnswer = (res) => {
    const choiced = res;
    setSelectedAnswer(choiced)

    if (filteredQuestions[iterator].respuesta_correcta === choiced) {
      setRightCounter((prev) => prev + 1);
      const newTimeLeft = countdown
      setTimeLeft(prev => prev + newTimeLeft)
    } else {
      setWrongCounter((prev) => prev + 1);
    }

    setIsNotChecked(false)
  }

  useEffect(() => {
    setIsNotChecked(true)

    setCountdown(15);
    
  },[iterator])


  // Restart
  const handleRestart = () => {
    setIterator(0);
    setRightCounter(0);
    setWrongCounter(0);
    setIsNotChecked(true);
    setSelectedAnswer(null);
    setCountdown(15);
    setIsFinished(false);
    setTimeLeft(0)

    setIsRestarted(true)
    handleSubmit()
  }

  // Return to Login
  const handleExit = (e) => {
    e.preventDefault()
    setIsSubmitted(false)
  }
  

  return (
    <div className='flex flex-col flex-grow justify-start items-center w-[1280px] mt-1 px-2 py-6 text-white'>
      <div className="flex flex-col w-full mb-7 gap-4 px-6">
        <h2 className='text-5xl text-center font-bold'>{selectedSettings.topic} <span className="text-5xl font-extrabold text-sky-400">Quiz</span></h2>
        <div className="flex w-fit rounded-full px-8 py-1 border-solid border-[1px] border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950">
          <p className="font-medium text-zinc-300">Difficult {selectedSettings.difficult}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar answeredQuestions={iterator} totalQuestions={selectedSettings.questions}/>

      {
        isFinished ? 
        (
          <>
            <div className='result'>
              <h1 className='user'>
                {user}
              </h1>
              <p>Tu puntaje es <span className='font-bold'>{timeLeft * rightCounter}</span></p>

              <div className="score">
                <div className="right">
                  <p className='font-bold'>Correctas</p>
                  <p className='counter right_counter'>{rightCounter}</p>
                </div>
                <div className="wrong">
                  <p className='font-bold'>Incorrectas</p>
                  <p className='counter wrong_counter'>{wrongCounter}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button className='restart_button' onClick={(e) => handleRestart(e)}>
                  Reiniciar
                </button>
                <button className='home_button' onClick={(e) => handleExit(e)}>
                  Volver a Inicio
                </button>
              </div>
            </div>
          </>
        )
        :
        (
          <div className="flex flex-row justify-center w-full h-full px-6 py-4 gap-10">

            {/* left column */}
            <div className="flex flex-col flex-1">
              <div className="flex w-full justify-between items-center mb-4">
                <p className="text-lg font-bold text-[#ffff3f]">Question {iterator + 1}/{selectedSettings.questions}</p>
                <div className="flex items-center gap-2 rounded-full">
                  <TimerIcon className="text-zinc-300"/>
                  <p className="text-lg font-medium tracking-wider text-zinc-300">{formatTime(countdown)}</p>  
                </div>
              </div>

              <div className="flex flex-grow flex-col gap-4 rounded-md">
                <p className="text-lg font-medium pr-1 text-zinc-100">{filteredQuestions[iterator].pregunta}</p>

                {/* CODE */}
                {
                  !filteredQuestions[iterator].code && (
                    <div className="flex-grow overflow-auto max-h-40 max-w-full">
                      <SyntaxHighlighter language="javascript" style={dracula} customStyle={{margin: 0, height: "100%",}} className="text-xs">
                        {codeString}
                      </SyntaxHighlighter>
                    </div>
                  )
                }
              </div>

              <div className="flex flex-row justify-between pt-2">
                <div className="flex items-center gap-3">
                  <CheckCircle className="size-6 text-green-500"/>
                  <p className='font-bold text-green-500'>{rightCounter}</p>
                </div>
                <div className="flex items-center gap-3">
                  <CircleX className="size-6 text-red-500"/>
                  <p className='font-bold text-red-500'>{wrongCounter}</p>
                </div>
              </div>
            </div>

            {/* right column */}
            <div className="flex flex-col flex-1 w-full gap-4">
              <div className="flex flex-col gap-4">
                {
                  filteredQuestions[iterator].respuestas.map((res, index) => {
                    return (
                      <div key={index}>                                                                                  
                        <button 
                          disabled={!isNotChecked} 
                          className={`choice ${!isNotChecked ? (res === filteredQuestions[iterator].respuesta_correcta ? 'choice-disabled pointer-events-none right_answer' : 'choice-disabled pointer-events-none') : ""} ${selectedAnswer ? ((selectedAnswer === res && selectedAnswer === filteredQuestions[iterator].respuesta_correcta) ? "right_answer" : (selectedAnswer === res ? "wrong_answer" : "")) : ""} ${!isNotChecked ? "choice-disabled" : ""} ${selectedAnswer ? ((selectedAnswer === res && selectedAnswer === filteredQuestions[iterator].respuesta_correcta) ? "right_answer" : (res === filteredQuestions[iterator].respuesta_correcta ? "right_answer" : "")) : ""}`} 
                          onClick={() => handleCheckAnswer(res)}
                        >
                          {res}
                        </button>
                      </div>
                    )
                  })
                }
              </div>
              <div className="flex w-full justify-between items-center">
                <button disabled={isNotChecked} className={`next-button ${isNotChecked ? "disabled": ""}`} onClick={() => handleNextQuestion()}>
                  {(iterator + 1) === selectedSettings.questions ?
                    <p className="text-xl text-zinc-900 font-bold">
                      Finish
                    </p>
                    :
                    <p className="text-xl text-zinc-900 font-bold">
                      Next Question
                    </p>
                  }
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
