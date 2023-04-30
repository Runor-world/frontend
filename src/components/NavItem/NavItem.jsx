import React from 'react'
import { Link, useLocation, useMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { closeSidebar } from '../../features/sidebar/sidebarSlice'


const NavItem = ({text, path, icon}) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const isMatch = useMatch(path, location.pathname)

    return (
        <li 
            className={`cursor-pointer rounded-full p-2 hover:bg-slate-300 hover:p-4 hover:scale-110 ${isMatch? 'bg-slate-200': ''} w-full transition-slow`}
            onClick={()=>{dispatch(closeSidebar())}}
        >
            <Link 
                to={path} 
                className='nav-link flex gap-7 items-center'
            >
                <span className='text-primary text-3xl'>{icon}</span>
                <span>{text}</span>
            </Link>
        </li>
    )
}

const withSidebarClose = (Component, clickHandler) => (props) =>{
    return <Component onClick={() => clickHandler(false)} {...props}/>
}

export default withSidebarClose(NavItem)