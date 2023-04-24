import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet, Link } from 'react-router-dom'
import { FaComment, FaServicestack, FaShoppingBag, FaUser } from 'react-icons/fa'
const DashboardSidebar = () => {
  return (
    <aside className='invisible lg:visible w-0 lg:w-1/6 h-screen text-black flex flex-col justify-center bg-slate-100 p-10'>
        <nav className='flex flex-col gap-2'>
            <Link to='services' className='btn-primary btn-hover flex gap-2 items-center'><FaShoppingBag /> Services</Link>
            <Link to='users' className='btn-primary btn-hover flex gap-2 items-center'><FaUser /> Users</Link>
            <Link to='complains' className='btn-primary btn-hover flex gap-2 items-center'><FaComment /> Complains</Link>
        </nav>
    </aside>
  )
}

export default DashboardSidebar