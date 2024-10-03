import { LinkRow, XformerlyTwitter } from "../assets/icons/Icons"

export function Footer() {
  return(
    <>
      <div className="w-full flex justify-center max-md:mt-4">
          <div className="w-full max-w-7xl">
            <div className="flex flex-row justify-evenly items-center p-5">
              <a href="" className="flex items-center gap-3 max-sm:hover:hover:bg-zinc-300/10 max-sm:hover:backdrop-blur-xl px-4 max-sm:py-1 py-2 rounded-lg hover:underline hover:underline-offset-4">
                <XformerlyTwitter className="max-sm:size-6"/>                
                <span className="flex items-center gap-1 font-medium text-zinc-300 max-sm:hidden">
                  Twitter
                  <LinkRow />
                </span>
              </a>

              <a href="https://portfolio-web-emmsanchez.vercel.app/" target="_blank" className="flex items-center gap-4 transition hover:bg-zinc-300/10 hover:backdrop-blur-xl px-4 max-sm:py-1 py-2 rounded-lg">
                <span className="font-medium text-zinc-300">Made by <span className="text-base text-zinc-100 font-bold max-sm:hidden">@EmmSanchez</span></span>
                <img
                  src="https://unavatar.io/github/emmsanchez"
                  alt="EmmSanchez Avatar"
                  className="max-sm:size-6 size-8 rounded-full"
                />
              </a>
            </div>
          </div>
      </div>
    </>
  )
} 