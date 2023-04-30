import React, { useEffect, useState } from 'react'
import ServiceList from '../../components/ServiceList/ServiceList'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../components/Loading/Loading'
import { getServices, openForm, setMessage } from '../../features/service/serviceSlice'
import ServiceForm from '../../components/ServiceForm/ServiceForm'
import ListHead from '../../components/ListHead/ListHead'

const Services = () => {
    const dispatch = useDispatch()
    const {services, isLoading, formIsOpened} = useSelector( store => store.service)
    

    useEffect(()=>{
        dispatch(getServices())
    }, [])
    
    const clickHandler = () => {
        dispatch(openForm())
    }

    if(isLoading){
        return <Loading />
    }
    return (
        <section className='flex flex-col gap-2'>

            <div className='flex justify-between items-cetner'>
                <h1 className='text-xl lg:text-xl font-semibold'>Services ({services.length})</h1>
                <button className='btn-primary text-xl' onClick={clickHandler}>+ New</button>
            </div>

            <ServiceList services={services}/>
            { formIsOpened && <ServiceForm/>}
        </section>
    )
}

export default Services