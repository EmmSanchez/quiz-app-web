import { AwardIcon, GitHubIcon, HomeIcon  } from "../assets/icons/Icons"

export function NavBar() {
  return (
    <>
      <nav className="w-full flex justify-center">
        <div className="w-full max-w-7xl">
          <div className="flex flex-row justify-between items-center max-sm:justify-around p-3">
            <a href="/" className="flex items-end gap-2 text-2xl font-semibold transition hover:cursor-pointer hover:opacity-85">
              <AwardIcon className="bg-gradient-to-bl from-neutral-800 to-neutral-950 rounded-md p-1 size-8"/>
              Quode
                <span className="max-md:hidden text-lg text-zinc-500 font-medium">
                  Test, Learn, Code!
                </span>
            </a>

            <ul className="flex items-center gap-1">
              <li className="p-2 rounded-md hover:bg-zinc-800 hover:cursor-pointer">
                <a href="/">
                  <HomeIcon className="size-6"/>
                </a>
              </li>
              <li className="p-2 rounded-md hover:bg-zinc-800 hover:cursor-pointer">
                <a href="https://github.com/EmmSanchez/quiz-app-web" target="_blank">
                  <GitHubIcon className="size-6"/>
                </a>               
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}