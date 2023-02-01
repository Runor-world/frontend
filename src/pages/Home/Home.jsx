import React from 'react'
import FeaturedServices from '../../components/FeaturedServices/FeaturedServices'
import Header from '../../components/Header/Header'
import Hero2 from '../../components/Hero2/Hero2'
import Sidebar from '../../components/Sidebar/Sidebar'
import StatusList from '../../components/StatusList/StatusList'

const Home = () => {
  return (
    <main className='w-full overflow-x-hidden'>
        {/* <Header /> */}
        <Hero2 />
        <FeaturedServices />
        <Sidebar />
    </main>
  )
}

export default Home