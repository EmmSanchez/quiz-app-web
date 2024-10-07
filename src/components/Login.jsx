/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import {
  BrainIcon,
  ClipboardListIcon,
  CodeIcon,
  PlayIcon,
} from '../assets/icons/Icons';
import { DropdownMenu } from './Dropdown';

export function Login({ handleSubmit, selectedSettings, setSelectedSettings }) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const dropdownOptions1 = ['JavaScript', 'Python', 'Rust'];
  const dropdownOptions2 = ['Easy', 'Medium', 'Hard'];
  const dropdownOptions3 = [5, 10, 15, 20];

  useEffect(() => {
    if (!activeDropdown) return setIsButtonDisabled(false);

    setIsButtonDisabled(true);
  }, [activeDropdown]);

  return (
    <>
      <header className="flex flex-col flex-grow justify-start items-center max-w-4xl sm:py-14">
        <h1 className="mt-6 sm:mt-8 mb-4 text-[30px] sm:text-[48px] lg:text-[64px] px-4 font-bold text-center">
          Test Your{' '}
          <span className="text-amber-300 font-bold">Code Knowledge</span>
        </h1>
        <p className="max-w-2xl text-center text-pretty text-lg max-sm:text-sm max-md:px-6">
          Challenge yourself with quizzes designed to test your coding knowledge
          across languages and frameworks.
        </p>

        <section className="flex flex-col items-center w-auto mt-6 sm:mt-12 gap-4 max-md:px-4">
          <div className="flex z-10 flex-wrap w-full justify-center gap-4">
            <DropdownMenu
              options={dropdownOptions1}
              title={selectedSettings.topic}
              id="1"
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
              setSelectedSettings={setSelectedSettings}
            >
              <CodeIcon className="size-5" />
            </DropdownMenu>
            <DropdownMenu
              options={dropdownOptions2}
              title={selectedSettings.difficult}
              id="2"
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
              setSelectedSettings={setSelectedSettings}
            >
              <BrainIcon className="size-5" />
            </DropdownMenu>
            <DropdownMenu
              options={dropdownOptions3}
              title={selectedSettings.questions}
              id="3"
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
              setSelectedSettings={setSelectedSettings}
            >
              <ClipboardListIcon className="size-5" />
            </DropdownMenu>
          </div>

          <div className="flex w-[95%] mt-4 ml-3 shadow-[-8px_8px_#fcd34d] rounded-md">
            <button
              disabled={isButtonDisabled}
              onClick={handleSubmit}
              className={`flex z-0 justify-center items-center w-full py-3 gap-3 bg-[#ffff3f] text-zinc-900 text-xl font-bold rounded-md transition ease-out border-solid border-2 border-zinc-900 ${isButtonDisabled ? 'pointer-events-none' : 'hover:-translate-x-2 hover:translate-y-2'}`}
            >
              <PlayIcon />
              Start Quiz
            </button>
          </div>
        </section>
      </header>
    </>
  );
}
