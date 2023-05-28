import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import Header from '../../components/Header/Header'
import MainContentWrapper from '../../components/MainContentWrapper/MainContentWrapper'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../components/Loading/Loading'
import { getServiceMan } from '../../features/serviceMan/serviceManSlice'
import { useNavigate, useParams } from 'react-router-dom'
import HiringWrapper from '../../components/HiringWrapper/HiringWrapper'
import HiringHeader from '../../components/HiringHeader/HiringHeader'
import { createHiring } from '../../features/hiring/hiringSlice'
import ModalWrapper from '../../components/ModalWrapper/ModalWrapper'
import HiringSuccess from '../../components/HiringSuccess/HiringSuccess'
import { openModal } from '../../features/modal/modalSlice'

const HiringConfirm = props => {
    const {serviceProvider, isLoading} = useSelector( store => store.serviceman)
    const {service, message, isLoading:hiringLoading, hiring} = useSelector( store => store.hiring)
    const {isOpened} = useSelector( store => store.modal)

    const dispatch = useDispatch()
    const {serviceProviderId} = useParams()
    const navigate = useNavigate()
    const [selectedService, setSlectedService] = useState({})

    const fetchServiceProvider = async()=>{
        try {
            const res = await dispatch(getServiceMan(serviceProviderId)).unwrap()
            console.log(res)
            if(serviceProvider.services.length === 1){
                setSlectedService(serviceProvider.services[0])
            }else{
                setSlectedService(service)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=> {
        fetchServiceProvider()
    }, [])

    const handleBackClick = () => {
        if(serviceProvider.services.length > 1){
            navigate(`/hiring/${serviceProviderId}`)
        }else{
            navigate('/')
        }
    }

    const handleConfirmClick = async() =>{
        try {
            const res = await dispatch(
                createHiring(
                    {
                        serviceProvider: serviceProviderId,
                        service: service._id
                    }
                )
            ).unwrap()
            dispatch(openModal())
        } catch (error) {
            console.log(error)
        }
    }

    if(isLoading){
        return <Loading />
    }

    return (
        <PageWrapper>
            <Header />
            <MainContentWrapper>
                <HiringWrapper>
                    <HiringHeader
                        serviceProvider={serviceProvider}
                        title='Confirm hiring' 
                    />
                    <div className='flex flex-col justify-between gap-10 items-center w-full p-2'>
                        <div className='text-center'>
                            <p>
                                You are about to hire <q>{serviceProvider.user.firstName} {serviceProvider.user.lastName?? serviceProvider.user.otherName}</q> for <q> {selectedService.name}</q>
                            </p>
                        </div>
                        <div className='flex justify-between gap-10 items-center w-full'>
                            <button 
                                className='btn-dark px-4 w-full' 
                                onClick={handleBackClick}>
                                    {serviceProvider.services.length > 1 ? 'Back': 'Cancel'}
                            </button>
                            <button 
                                className={`btn-dark ${!message.error? 'bg-slate-400' :'bg-primary'} font-semibold px-4 w-full`} 
                                disabled={!message.error}
                                onClick={handleConfirmClick}
                                >Confirm
                            </button>
                        </div>
                    </div>
                </HiringWrapper>
            </MainContentWrapper>
            {
                isOpened && 
                <ModalWrapper>
                    <HiringSuccess 
                        serviceProvider={serviceProvider} 
                        hiring={hiring}
                    />
                </ModalWrapper>
            }
        </PageWrapper>
    )
}

HiringConfirm.propTypes = {}

export default HiringConfirm