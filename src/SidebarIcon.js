import React from 'react'

const SidebarIcon = ({icon, tooltipText}) => {
  return (
    <div className='sidebar-icon group'>
        {icon}
        <span className='sidebar-tooltip group-hover:scale-100'>
            {tooltipText}
        </span>
    </div>
  )
}

export default SidebarIcon