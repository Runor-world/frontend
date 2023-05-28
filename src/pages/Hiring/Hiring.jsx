import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './Hiring.css'
import { useDispatch, useSelector } from 'react-redux'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import Header from '../../components/Header/Header'
import MainContentWrapper from '../../components/MainContentWrapper/MainContentWrapper'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getServiceMan } from '../../features/serviceMan/serviceManSlice'
import Loading from '../../components/Loading/Loading'
import HiringSuccess from '../../components/HiringSuccess/HiringSuccess'
import { createHiring, setService } from '../../features/hiring/hiringSlice'
import ModalWrapper from '../../components/ModalWrapper/ModalWrapper'
import { openModal } from '../../features/modal/modalSlice'


const Hiring = () => {
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getServiceMan(serviceProviderId))
    }, [])

    const {serviceProvider,  isLoading, } = useSelector( store => store.serviceman)
    const { hiring, message} = useSelector( store => store.hiring)
    const {isOpened} = useSelector( store => store.modal)

    const [selectedService, setSelectedService] = useState(null)
    const {serviceProviderId} = useParams()
    const navigate = useNavigate()

    const steps = [
        {
            title: 'Service selection',
            message: 'Select service',
            number: 1
        },
        {
            title: 'Confirm hiring',
            message: `You are about to hire`,
            number: 2
        },
        {
            title: 'Hiring completed!',
            message: `You have hired`,
            number: 3
        }
    ]

    const formik = useFormik({
        initialValues: {
            service: '',
        },
        validationSchema: Yup.object({
                service: Yup.string().required()
        }),
        onSubmit: async(values) => {
            const hiring = {
                service: values.service,
                serviceProvider: serviceProvider.user._id, 
            }
            try {
                const res = await dispatch(createHiring(hiring)).unwrap()
                if(message.error === true){
                    dispatch(openModal())
                }
            } catch (error) {
                console.log(error)
            }
        }
    })

    const [hiringStep, setHiringStep] = useState(steps[0])

    const handleChange = (e) =>{
        formik.handleChange(e)
        const service = serviceProvider.services.filter( service => service._id === e.target.value)[0]
        setSelectedService(service)
    }

    const handleNextClick = ()=>{
        if(hiringStep.number < steps.length ){
            const nextStep = steps.filter( step => step.number === hiringStep.number + 1)
            console.log(nextStep[0])
            setHiringStep(nextStep[0])
        }else{
            setHiringStep(steps[0])
        }
    }

    const handleBackClick = ()=>{
        if(hiringStep.number >= 1 ){
            const nextStep = steps.filter( step => step.number === hiringStep.number - 1)
            console.log(nextStep[0])
            setHiringStep(nextStep[0])
        }else{
            setHiringStep(steps[2])
        }
    }

    useEffect(()=>{
        if(serviceProvider.services.length === 1){
            navigate('/hiring/confirm')
        }
    }, [])

    if(isLoading){
        return <Loading />
    }
    return (
        <PageWrapper>
            <Header  />
            <MainContentWrapper>
                <div className='hiring flex flex-col items-center w-full lg:w-2/3 m-auto'>
                    <small 
                        className=  {`text-${message.error? 'red': 'green'}-500`}>{message.text}
                    </small>
                    <div 
                        className='w-full p-2 flex flex-col gap-2 items-center justify-center border-2 rounded-md bg-slate-50 border-slate-50'
                    >
                        <img 
                            src={serviceProvider.profile.photo} 
                            alt={serviceProvider.user.firstName}
                            className='ring-2 w-20 h-20 rounded-full' 
                        />
                        <small>
                            {serviceProvider.user.firstName} {serviceProvider.user.lastName?? serviceProvider.user.otherName} 
                        </small>
                    </div>

                    <div className='w-full text-primary text-center text-xl lg:text-2xl font-semibold p-2  mt-4'>     
                        <h1 className='text-xl text-slate-400'>Hiring step {hiringStep.number} of {steps.length}:
                            <span className='font-normal text-primary'> {hiringStep.title}</span>
                        </h1>
                    </div>
                    
                    <form onSubmit={formik.handleSubmit}
                        className='my-5 w-full flex flex-col items-center border-2 border-slate-100 p-2 lg:p-5'>

                        <div className='flex flex-col gap-2 w-full'>
                            {
                                // allow user to select service if provider provides multiple services
                                hiringStep.number === 1 && serviceProvider.services.length > 1 ?(
                                    <div className='form-group'>
                                        <label 
                                            className='whitespace-nowrap text-center my-2' htmlFor='service'>
                                            Select a service
                                        </label>
                                        <div className='flex gap-2 justify-center'>
                                            {
                                                serviceProvider.services.map(service => 
                                                    <div 
                                                        className='inline-flex gap-1 justify-start items-center border-slate-200 p-2 px-4 whitespace-nowrap rounded-full border-2'>
                                                        <input
                                                            id={service._id}
                                                            type='radio'
                                                            {...formik.getFieldProps('service')}
                                                            value={service._id}
                                                            key={service._id}
                                                            checked={formik.values.service === service._id}
                                                            onChange={handleChange}
                                                        /> <label htmlFor={service._id}>{service.name}</label>
                                                    </div>         
                                                )     
                                            }
                                        </div>
                                    </div>
                                ):
                                (  
                                    <div className='flex flex-col justify-between gap-10 items-center w-full p-2'>
                                        <div className='text-center'>
                                            You are about to hire <q>{serviceProvider.user.firstName} {serviceProvider.user.lastName?? serviceProvider.user.otherName}</q> for <q>{selectedService?.name}</q>
                                        </div>
                                        <div className='flex justify-between gap-10 items-center w-full'>
                                            <button className='btn-dark px-4 w-full' onClick={handleBackClick}>Back</button>
                                            <input 
                                                type='submit' 
                                                className={`btn-dark ${!message.error? 'bg-slate-400' :'bg-primary'} font-semibold px-4 w-full`} 
                                                value={'Confirm'} 
                                                disabled={!message.error}
                                            />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    

                    </form>
                    {
                        hiringStep.number === 1 ? (
                            <div className='flex justify-between gap-10 items-center w-full mt-10'>
                                <Link className='btn-dark px-4 w-full' to={'/'}>Cancel</Link>
                                <button 
                                    className={`btn-dark px-4 w-full ${!selectedService? 'bg-slate-100': 'bg-primary'} `}
                                    disabled={!selectedService}
                                    onClick={handleNextClick}
                                    >Checkout
                                </button>
                            </div>
                        ):(
                           null
                        )
                    }
                </div>
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

Hiring.propTypes = {}

export default Hiring