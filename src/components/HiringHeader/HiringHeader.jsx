import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const HiringHeader = ({serviceProvider, title}) => {
    const { message} = useSelector(store => store.hiring)
    const {firstName, lastName, otherName} = serviceProvider.user
    const {services} = serviceProvider
    const number = services.length === 1? 1 : 2
    const steps = serviceProvider.services.length > 1? 2: 1  
    return (
        <header className='w-full flex flex-col gap-3'>
            <small 
                className=  {`text-${message.error? 'red': 'green'}-500 text-center`}>{message.text}
            </small>
            <div 
                className='w-full p-2 flex flex-col gap-2 items-center justify-center border-2 rounded-md bg-slate-100 border-slate-50'
            >
                <img 
                    src={serviceProvider.profile.photo} 
                    alt={firstName}
                    className='ring-2 w-20 h-20 rounded-full' 
                />
                <small className='font-semibold'>
                    {firstName} {lastName?? otherName} 
                </small>
            </div>

            <div className='w-full text-primary text-center text-xl lg:text-2xl font-semibold   mt-4'>     
                <h1 className='text-lg md:text-xl text-slate-400'>Hiring step {number} of {steps}:
                    <span className='font-normal text-primary'> {title}</span>
                </h1>
            </div>
        </header>
    )
}

HiringHeader.propTypes = {
    title: PropTypes.string.isRequired,
    serviceProvider: PropTypes.object.isRequired
}

export default HiringHeader