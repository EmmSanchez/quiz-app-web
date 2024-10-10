/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { ProgressBar } from './ProgressBar';
import { Question } from './Question';
import { FinalScore } from './FinalScore';

export function Quiz({
  setIsSubmitted,
  selectedSettings,
  filteredQuestions,
  handleSubmit,
}) {
  const minutes = selectedSettings.minutesPerQuestion * 60;
  const [iterator, setIterator] = useState(0);
  const [rightCounter, setRightCounter] = useState(0);
  const [wrongCounter, setWrongCounter] = useState(0);
  const [isNotChecked, setIsNotChecked] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [countdown, setCountdown] = useState(minutes);
  const [timeTaken, setTimeTaken] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isTimeEnabled, setIsTimeEnabled] = useState(false);
  useEffect(() => {
    if (selectedSettings.minutesPerQuestion === 0) {
      setIsTimeEnabled(false);
    } else {
      setIsTimeEnabled(true);
    }
  }, [selectedSettings.minutesPerQuestion]);

  const timerId = useRef();

  // TIMER
  useEffect(() => {
    timerId.current = setInterval(() => {
      if (selectedAnswer || isFinished) return;

      setTimeTaken((prev) => prev + 1);

      if (countdown > 0) {
        setCountdown((prev) => prev - 1);
      }
    }, 1000);
    return () => clearInterval(timerId.current);
  }, [timeTaken, countdown]);

  // WHEN TIME IS OVER
  useEffect(() => {
    if (!isTimeEnabled) return;

    if (countdown <= 0) {
      setCountdown(0);
      if (isNotChecked) {
        setWrongCounter((prev) => prev + 1);
        setIsNotChecked(false);
      } else {
        setIsNotChecked(false);
      }
    }
  }, [countdown]);

  const handleNextQuestion = () => {
    if (iterator < filteredQuestions.length - 1) {
      setIterator(iterator + 1);
    } else {
      setIsFinished(true);
    }
    setSelectedAnswer(null);
  };

  const handleCheckAnswer = (res) => {
    const choiced = res;
    setSelectedAnswer(choiced);

    if (filteredQuestions[iterator].correct_option === choiced) {
      setRightCounter((prev) => prev + 1);
    } else {
      setWrongCounter((prev) => prev + 1);
    }

    setIsNotChecked(false);
  };

  useEffect(() => {
    setIsNotChecked(true);
    setCountdown(minutes);
  }, [iterator]);

  // Restart
  const handleRestart = () => {
    setIterator(0);
    setRightCounter(0);
    setWrongCounter(0);
    setIsNotChecked(true);
    setSelectedAnswer(null);
    setCountdown(minutes);
    setIsFinished(false);
    setTimeTaken(0);

    handleSubmit();
  };

  // Return to Login
  const handleExit = (e) => {
    e.preventDefault();
    setIsSubmitted(false);
    setIsFinished(false);
  };

  return (
    <div className="flex flex-col flex-grow justify-start items-center w-full min-[1280px]:w-[1280px] mt-1 px-2 max-md:py-2 py-6 text-white">
      <div className="flex flex-col w-full mb-4 md:mb-7 gap-4 px-6">
        <h2 className="text-5xl text-center font-bold">
          {selectedSettings.topic}{' '}
          <span className="text-5xl font-extrabold text-sky-400">Quiz</span>
        </h2>
        <div className="flex w-fit max-md:mx-auto rounded-full px-8 py-1 border-solid border-[1px] border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950">
          <p className="max-md:text-sm font-medium text-zinc-300">
            Difficult {selectedSettings.difficult}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar
        answeredQuestions={iterator}
        totalQuestions={selectedSettings.questions}
        isFinished={isFinished}
      />

      {isFinished ? (
        <>
          <FinalScore
            totalQuestions={selectedSettings.questions}
            rightCounter={rightCounter}
            wrongCounter={wrongCounter}
            timeTaken={timeTaken}
            handleRestart={handleRestart}
            handleExit={handleExit}
          />
        </>
      ) : (
        <Question
          filteredQuestions={filteredQuestions}
          iterator={iterator}
          countdown={countdown}
          rightCounter={rightCounter}
          wrongCounter={wrongCounter}
          selectedAnswer={selectedAnswer}
          selectedSettings={selectedSettings}
          handleCheckAnswer={handleCheckAnswer}
          handleNextQuestion={handleNextQuestion}
          isNotChecked={isNotChecked}
          minutes={minutes}
        />
      )}
    </div>
  );
}
