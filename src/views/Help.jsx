import Menubar from "../components/Static/Menubar"
import HelpInfo from "../components/Static/HelpInfo"

export default function Help() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Menubar />
      <div className='md:max-w-screen-sm w-full h-full mb-28 md:mb-10 md:mt-20 p-4 md:p-0 font-display'>
        <HelpInfo />
      </div>
    </div>
  )
}
