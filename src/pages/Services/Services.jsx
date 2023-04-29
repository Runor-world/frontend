import React, { useEffect, useState } from 'react'
import ServiceList from '../../components/ServiceList/ServiceList'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../components/Loading/Loading'
import { getServices } from '../../features/service/serviceSlice'
import ServiceForm from '../../components/ServiceForm/ServiceForm'
import ListHead from '../../components/ListHead/ListHead'

const Services = () => {
    const dispatch = useDispatch()
    const {services, isLoading} = useSelector( store => store.service)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(()=>{
        dispatch(getServices())
    }, [])
    
    if(isLoading){
        return <Loading />
    }
    return (
        <section className='flex flex-col gap-2'>

            <div className='flex justify-between items-cetner'>
                <h1 className='text-xl lg:text-xl font-semibold'>Services</h1>
                <button className='btn-primary text-xl' onClick={()=> setIsOpen(true)}>+ New</button>
            </div>

            {/* Service list head */}
            {
                services?.length > 0? 
                <ListHead /> :
                (
                    <div className='flex flex-col items-center justify-center place-self-center p-2 rounded-md bg-slate-100 mt-5'>
                        <p className='text-center font-semibold'>You have not added services</p>
                    </div>
                )
            }

            <ServiceList services={services} setIsOpen={setIsOpen}/>
            { isOpen && <ServiceForm setOpen={setIsOpen}/>}
        </section>
    )
}

export default Services