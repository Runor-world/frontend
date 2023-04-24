import React, { useEffect } from 'react'
import ServiceList from '../../components/ServiceList/ServiceList'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../components/Loading/Loading'
import { getServices } from '../../features/service/serviceSlice'

const Services = () => {
    const dispatch = useDispatch()
    const {services, isLoading} = useSelector( store => store.service)
    console.log(services)

    useEffect(()=>{
        dispatch(getServices())
    }, [])
    
    if(isLoading){
        return <Loading />
    }
    return (
        <section className='flex flex-col gap-2'>
            <div className='flex justify-between items-cetner'>
                <h1 className='text-xl lg:text-3xl font-bold'>Services</h1>
                <button className='btn-primary'>+ New</button>
            </div>

            <ServiceList services={services} />
        </section>
    )
}

export default Services