import { useState, useEffect, useRef } from "react"
import { TimerIcon } from "../assets/icons/TimerIcon"
import data from "../data/data.json"

// QUIZ -------------------------------------------------------------------------
// eslint-disable-next-line react/prop-types
export function Quiz({user, setIsSubmitted}) {
  const [iterator, setIterator] = useState(0)
  const [rightCounter, setRightCounter] = useState(0)
  const [wrongCounter, setWrongCounter] = useState(0)
  const [isNotChecked, setIsNotChecked] = useState(true)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [countdown, setCountdown] = useState(15)
  const [timeLeft, setTimeLeft] = useState(0)
  const timerId = useRef()

  const [indexList, setIndexList] = useState([])
  const [filteredQuestions, setFilteredQuestions] = useState(data)

  const [isFinished, setIsFinished] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [isRestarted, setIsRestarted] = useState(false)

  // GENERADOR DE NUMEROS ALEATORIOS -------------------------------------------------------------------
  const randomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  const generateUniqueRandomNumbers = (min, max, count) => {
    const uniqueNumbers = new Set();
    while (uniqueNumbers.size < count) {
      uniqueNumbers.add(randomNumberBetween(min, max));
    }
    return Array.from(uniqueNumbers);
  }
  
  
  // GUARDAR PREGUNTAS FILTRADAS -----------------------------------------------------------------------
  
  // FILTRADO FUNCION
  // function filtrarPorIndice(questions, indexList) {
  //   let filtrado = [];
  //   indexList.forEach((value) => {
  //     questions.forEach((question, i) => {
  //       if (value === i) {
  //         filtrado.push(question);
  //       }
  //     });
  //   });
  //   return filtrado;
  // }

  // FUNCIÓN DE GENERAR 3M Y 3O
  function obtenerPreguntasAleatorias(preguntas) {
    // Filtrar preguntas por tipo
    const preguntasM = preguntas.filter(pregunta => pregunta.tipo === 'M');
    const preguntasO = preguntas.filter(pregunta => pregunta.tipo === 'O');
    
    // Función para obtener índices aleatorios sin repetición
    function obtenerIndicesAleatorios(n, max) {
        const indices = [];
        while (indices.length < n) {
            const indice = Math.floor(Math.random() * max);
            if (!indices.includes(indice)) {
                indices.push(indice);
            }
        }
        return indices;
    }
    
    // Obtener índices aleatorios sin repetición para cada tipo
    const indicesM = obtenerIndicesAleatorios(3, preguntasM.length);
    const indicesO = obtenerIndicesAleatorios(3, preguntasO.length);
    
    // Obtener preguntas aleatorias
    const preguntasAleatorias = [];
    indicesM.forEach(indice => preguntasAleatorias.push(preguntasM[indice]));
    indicesO.forEach(indice => preguntasAleatorias.push(preguntasO[indice]));
    
    return preguntasAleatorias;
  }
  

  // GENERAR INDEX LIST ---------------------------------------------------------------------------------
  useEffect(() => {
    const uniqueNumbers = generateUniqueRandomNumbers(0, data.length - 1, 6);
    setIndexList(uniqueNumbers);
  }, []);
  
  // FILTRADO -----------------------------------------------------------------------------
  useEffect(() => {
    if (indexList.length === 6) {
      const newFilteredQuestions = obtenerPreguntasAleatorias(data);
      setFilteredQuestions(newFilteredQuestions);
    }
  }, [indexList]);


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
  const handleRestart = (e) => {
    e.preventDefault()
    setIterator(0);
    setRightCounter(0);
    setWrongCounter(0);
    setIsNotChecked(true);
    setSelectedAnswer(null);
    setCountdown(15);
    setIsFinished(false);
    setTimeLeft(0)


    setIsRestarted(true)

    const uniqueNumbers = generateUniqueRandomNumbers(0, data.length - 1, 6);
    setIndexList(uniqueNumbers);
  }

  // Return to Login
  const handleExit = (e) => {
    e.preventDefault()
    setIsSubmitted(false)
  }
  

  return (
    <div className='flex flex-col justify-center items-center w-[500px] h-[600px] px-6 py-8 text-black bg-white rounded-lg'>
      <h1 className='text-5xl font-bold mb-4'>MN Quiz</h1>
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
          <>
            <div className="flex w-full justify-between items-center pb-2">
              <p>{iterator + 1}/6</p>
              <div className="flex items-center gap-2 bg-zinc-200 px-4 py-2 rounded-full">
                <TimerIcon/>
                <p>{formatTime(countdown)}</p>  
              </div>
            </div>
            <div className="w-full py-4 border-t-[1px] border-gray-500">
              <p className="text-base font-bold">{filteredQuestions[iterator].pregunta}</p>
              <div className="flex flex-col py-4 gap-2">
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
            </div>
            <div className="flex w-full justify-between items-center pb-2">
              <div className="quiz_result">
                <p className='font-bold'>✅ {rightCounter}</p>
                <p className='font-bold'>❌ {wrongCounter}</p>
              </div>
              <button disabled={isNotChecked} className={`next-button ${isNotChecked ? "disabled": ""}`} onClick={() => handleNextQuestion()}>Siguiente</button>
            </div>
          </>
        )
      }
    </div>
  )
}
