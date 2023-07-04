import {FaBook, FaInfo, FaPlay} from 'react-icons/fa'

import SidebarIcon from "./SidebarIcon"

const Sidebar = () => {
    return (
        <div
            className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col 
        bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xl">
            <SidebarIcon icon={<FaPlay  size="24"/>} tooltipText={"Play the Game"}/>
            <SidebarIcon icon={<FaBook  size="24"/>} tooltipText={"Compendium"}/>
            <SidebarIcon icon={<FaInfo  size="24"/>} tooltipText={"How to Play"}/>
        </div>
    )
}

export default Sidebar
