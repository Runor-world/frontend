import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet, Link, useMatch, useLocation } from 'react-router-dom'
import { FaBabyCarriage, FaComment, FaEnvelopeOpen, FaFileInvoice, FaServicestack, FaShoppingBag, FaUser, FaUsers } from 'react-icons/fa'
import NavItem from '../NavItem/NavItem'

const DashboardSidebar = () => {
  const location = useLocation()
  console.log(location.pathname)
  return (
    <aside className='hidden lg:inline-flex w-0 lg:w-1/6 h-screen text-black flex flex-col justify-center bg-slate-100 p-10'>
        <nav className='flex flex-col justify-center gap-2'>
          <ul className='list-none'>
            <NavItem path='/dashboard' text='Services' icon={<FaBabyCarriage />} />
            <NavItem path='/dashboard/users' text='Users' icon={<FaUsers />} />
            <NavItem path='/dashboard/complains' text='Feedback' icon={<FaEnvelopeOpen />} />
          </ul>
        </nav>
    </aside>
  )
}

export default DashboardSidebar