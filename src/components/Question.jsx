/* eslint-disable react/prop-types */
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { TimerIcon, CheckCircle, CircleX } from '../assets/icons/Icons';
import { formatTime } from '../utils/formatTime';

export function Question({
  filteredQuestions,
  iterator,
  countdown,
  rightCounter,
  wrongCounter,
  selectedAnswer,
  selectedSettings,
  handleCheckAnswer,
  handleNextQuestion,
  isNotChecked,
  minutes,
}) {
  const codeString =
    "const fruits = ['apple', 'banana'];\nfruits.push('orange')\nfruits.push('orange')\nfruits.push('orange')\nfruits.push('orange')\nfruits.push('orange')";

  return (
    <>
      <div className="flex max-md:flex-col flex-row justify-center w-full h-full px-6 md:py-4 gap-4 md:gap-10">
        {/* left column */}
        <div className="flex flex-col flex-1">
          <div className="flex w-full justify-between items-center mb-4">
            <p className="max-md:text-sm text-lg font-bold text-[#ffff3f]">
              Question {iterator + 1}/{selectedSettings.questions}
            </p>
            {minutes > 0 && (
              <div className="flex items-center gap-2 rounded-full">
                <TimerIcon className="max-md:size-4 text-zinc-300" />
                <p className="max-md:text-sm text-lg font-medium tracking-wider text-zinc-300">
                  {formatTime(countdown)}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-grow flex-col gap-4 rounded-md">
            <p className="max-md:text-sm text-lg font-medium pr-1 text-zinc-100">
              {filteredQuestions[iterator].pregunta}
            </p>

            {/* CODE */}
            {!filteredQuestions[iterator].code && (
              <div className="flex-grow overflow-auto max-h-40 max-w-full">
                <SyntaxHighlighter
                  language="javascript"
                  style={dracula}
                  customStyle={{ margin: 0, height: '100%' }}
                  className="max-md:text-[10px] text-xs"
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>
            )}
          </div>

          <div className="flex flex-row justify-between pt-2">
            <div className="flex items-center gap-3">
              <CheckCircle className="max-md:size-5 size-6 text-green-500" />
              <p className="font-bold text-green-500">{rightCounter}</p>
            </div>
            <div className="flex items-center gap-3">
              <CircleX className="max-md:size-5 size-6 text-red-500" />
              <p className="font-bold text-red-500">{wrongCounter}</p>
            </div>
          </div>
        </div>

        {/* right column */}
        <div className="flex flex-col flex-1 w-full max-md:gap-3 gap-4">
          <div className="flex flex-col max-md:gap-2 gap-4">
            {filteredQuestions[iterator].respuestas.map((res, index) => {
              return (
                <div key={index}>
                  <button
                    disabled={!isNotChecked}
                    className={`choice ${!isNotChecked ? (res === filteredQuestions[iterator].respuesta_correcta ? 'choice-disabled pointer-events-none bg-zinc-600' : 'choice-disabled pointer-events-none') : ''} ${selectedAnswer ? (selectedAnswer === res && selectedAnswer === filteredQuestions[iterator].respuesta_correcta ? 'right_answer' : selectedAnswer === res ? 'wrong_answer' : '') : ''} ${!isNotChecked ? 'choice-disabled' : ''} ${selectedAnswer ? (selectedAnswer === res && selectedAnswer === filteredQuestions[iterator].respuesta_correcta ? 'right_answer' : res === filteredQuestions[iterator].respuesta_correcta ? 'right_answer' : '') : ''}`}
                    onClick={() => handleCheckAnswer(res)}
                  >
                    {res}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="flex w-full justify-between items-center">
            <button
              disabled={isNotChecked}
              className={`next-button ${isNotChecked ? 'disabled' : ''}`}
              onClick={() => handleNextQuestion()}
            >
              {iterator + 1 === selectedSettings.questions ? (
                <p className="text-xl text-zinc-900 font-bold">Finish</p>
              ) : (
                <p className="text-xl text-zinc-900 font-bold">Next Question</p>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
