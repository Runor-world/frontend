import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import Header from '../../components/Header/Header'
import UserSearchBar from '../../components/UserSearchBar/UserSearchBar'
import ServiceSearchBar from '../../components/ServiceSearchBar/ServiceSearchBar'
import ServiceCategoryList from '../../components/ServiceCategoryList/ServiceCategoryList'
import { useDispatch, useSelector } from 'react-redux'
import { getServices } from '../../features/service/serviceSlice'
import ServiceSearchBarWrapper from '../../components/ServiceSearchBarWrapper/ServiceSearchBarWrapper'
import ModalWrapper from '../../components/ModalWrapper/ModalWrapper'
import SearchForm from '../../components/SearchForm/SearchForm'
import { getAllServiceMen } from '../../features/serviceMan/serviceManSlice'
import ServiceMan from '../../components/ServiceMan/ServiceMan'
import Footer from '../../components/Footer/Footer'

const Landing = () => {
    const dispatch = useDispatch()
    const {services} = useSelector( store => store.service)
    const {searchBarVisible} = useSelector( store => store.search)
    const {serviceMen} = useSelector( store => store.serviceman)
    useEffect(() => {
      dispatch(getServices())
      dispatch(getAllServiceMen())
    }, [])
    
    return (
        <div  className='w-full overflow-x-hidden'>
            <Header />
            <ServiceSearchBarWrapper>
                <ServiceSearchBar />                
                <section className='grid grid-col lg:grid-cols-4 w-full gap-5 items-start mb-10'>
                    <div className='flex col-span-full lg:col-span-1 flex-col gap-5'>
                        <h2 className='text-lg font-semibold'>Services 
                            <span className='ring-2 rounded-full w-20 p-1 h-5 m-2 text-primary font-normal'>{services.length}</span>
                        </h2>
                        <ServiceCategoryList services={services}/>
                    </div>
                    <div className='col-span-full lg:col-span-3 w-full justify-center'>
                        <h3 className='text-lg font-bold'>Service men
                            <span className='ring-2 rounded-full w-[20px] p-1 h-5 m-2 text-primary font-normal'>{serviceMen.length}</span>
                        </h3>
                        <div className='flex flex-col gap-4 mt-5 pr-6'>
                            {
                                serviceMen.map( serviceMan => <ServiceMan key={serviceMan._id} {...serviceMan}/>)
                            }
                        </div>
                    </div>
                </section>
            </ServiceSearchBarWrapper>
            <Footer />

            
        </div>
    )
}

Landing.propTypes = {}

export default Landing