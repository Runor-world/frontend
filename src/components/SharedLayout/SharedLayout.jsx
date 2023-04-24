import React from 'react'
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import DashBoardMainWrapper from '../DashboardMainWrapper/DashBoardMainWrapper'

const SharedLayout = () => {
  return (
    <div className='flex w-full h-full'>
        <Header />
        <DashboardSidebar/>
        <DashBoardMainWrapper>
            <Outlet />
        </DashBoardMainWrapper>
    </div>
  )
}

export default SharedLayout