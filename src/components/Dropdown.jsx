/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';

export function DropdownMenu({
  children,
  options,
  title,
  id,
  activeDropdown,
  setActiveDropdown,
  setSelectedSettings,
}) {
  const dropdownRef = useRef();
  const buttonRef = useRef();

  const handleSelectOption = (e, selection, id) => {
    e.preventDefault();
    e.stopPropagation();

    switch (id) {
      case '1': {
        setSelectedSettings((prev) => ({ ...prev, topic: selection }));
        break;
      }
      case '2': {
        setSelectedSettings((prev) => ({ ...prev, difficult: selection }));
        break;
      }
      case '3': {
        setSelectedSettings((prev) => ({ ...prev, questions: selection }));
        break;
      }
      case '4': {
        setSelectedSettings((prev) => ({
          ...prev,
          minutesPerQuestion: selection,
        }));
      }
    }

    setActiveDropdown(null);
  };

  const toggleDropdown = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    if (activeDropdown !== id) {
      setActiveDropdown(id);
    }
  };

  // Manage hide when click is outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown === null) return;

      // verify if the click is not inside the dropdownRef
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeDropdown]);

  const handleKeysItems = (e, option, id) => {
    e.preventDefault();
    const key = e.key;
    if (key === 'Enter') {
      handleSelectOption(e, option, id);
      buttonRef.current.focus();
    }

    if (key === 'ArrowDown') {
      const nextItem = e.target.nextElementSibling;
      if (nextItem) {
        nextItem.focus();
      }
    }

    if (key === 'ArrowUp') {
      const previuosItem = e.target.previousElementSibling;
      if (previuosItem) {
        previuosItem.focus();
      }
    }

    if (key === 'Escape') {
      const parentElement = e.target.parentElement;
      if (parentElement) {
        setActiveDropdown(null);
        buttonRef.current.focus();
      }
    }
  };

  useEffect(() => {
    if (activeDropdown === id) {
      const ulElement = dropdownRef.current.querySelector('ul');
      const firstItem = ulElement?.firstElementChild;

      if (firstItem) {
        firstItem.focus();
      }
    }
  }, [activeDropdown, id]);

  return (
    <>
      <div className="flex flex-col">
        <button
          ref={buttonRef}
          onClick={(e) => toggleDropdown(e, id)}
          className={`flex justify-center items-center gap-2 w-40 ${id === '4' ? 'md:w-full' : ''} border-solid border-[1px] border-zinc-700 px-4 py-2 rounded-md transition-all ease-out hover:bg-zinc-700 ${activeDropdown === id ? 'pointer-events-none' : 'pointer-events-auto'}`}
        >
          {children}

          {title && (
            <p className="font-medium">
              {title}{' '}
              {id === '3' ? (
                <span className="font-medium">Questions</span>
              ) : (
                <></>
              )}
            </p>
          )}
        </button>

        <div
          ref={dropdownRef}
          className={`${activeDropdown === id ? 'modal-opened' : 'modal-hidden'}`}
        >
          <ul
            className="custom-scroll absolute flex flex-col w-full max-h-40 overflow-y-auto mt-2 p-1 gap-1 bg-zinc-950 rounded-md border-solid border-[1px] border-zinc-700"
            role="listbox"
            aria-labelledby="dropdownLabel"
          >
            {options &&
              options.map((option, index) => {
                return (
                  <li
                    key={index}
                    onClick={(e) => handleSelectOption(e, option, id)}
                    onKeyDown={(e) => handleKeysItems(e, option, id)}
                    className={`px-4 py-1 rounded-sm transition hover:bg-zinc-700 hover:cursor-pointer focus:bg-zinc-700 outline-none ${option === title ? 'bg-amber-300 text-zinc-950 hover:text-white focus:text-white' : ''}`}
                    role="option"
                    tabIndex="0"
                  >
                    <p className="font-medium">
                      {option}{' '}
                      {id === '3' ? (
                        <span className="font-medium">Questions</span>
                      ) : (
                        <></>
                      )}
                    </p>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}
