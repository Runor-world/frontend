import React from 'react'
import FeaturedServiceProviders from '../../components/FeaturedServiceProviders/FeaturedServiceProviders'
import FeaturedServices from '../../components/FeaturedServices/FeaturedServices'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Hero2 from '../../components/Hero2/Hero2'
import HireWorker from '../../components/HireWorker/HireWorker'
import PostJob from '../../components/PostJob/PostJob'
import WorkerCategories from '../../components/WorkerCategories/WorkerCategories'
import { useSelector } from 'react-redux'
import Loading from '../../components/Loading/Loading'

const Home = () => {
  const {isLoading, } = useSelector( store => store.profile)

  if(isLoading) return <Loading />
  return (
    <div className='w-full mt-0 lg:mt-0 overflow-x-hidden'>
        <Header />
        <Hero2 />
        <FeaturedServices />
        <FeaturedServiceProviders />
        <PostJob />
        <HireWorker />
        <WorkerCategories />
        <Footer />
    </div>
  )
}

export default Home