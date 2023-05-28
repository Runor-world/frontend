import React from 'react'
import PropTypes from 'prop-types'
import { FaCalendar, FaClock, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const HiringItem = ({hiring}) => {
    const {service, serviceProvider, createdAt, status, profile} = hiring
    const {lastname, firstName, otherName, _id} = serviceProvider
    const dateTime = new Date(createdAt)

    const getStatusColor = () =>{
        switch(status){
            case 'completed': 
                return 'bg-green-300'
            case 'in progress':
                return 'bg-blue-300'
            case 'cancelled':
                return 'bg-red-300'
            default:
                return 'bg-orange-300'
        }
    }

    return (
        <article className='flex flex-col gap-3 rounded-md shadow-md relative w-full md:w-2/3 bg-slate-50'>
            {/* head */}
            <header className='flex flex-col gap-3 border-b-2 rounded-t-md bg-slate-100 p-5'>
                <div className='flex gap-2'>
                    <h3 className='text-primary'>{service.name}</h3>
                    <div 
                        className={`${getStatusColor()} px-2 flex-1 rounded-full text-center animate-pulse`}>
                        <small className='text-center'>{status}</small>
                    </div>
                </div>
                <div className='flex gap-4 items-center'>
                    <div className='self-start'>
                        <img 
                            src={profile.photo} 
                            alt={firstName}  
                            className='h-12 w-12 lg:w-20 lg:h-20 ring-2 rounded-full ring-slate-400'
                        />
                    </div>
                    <div className='flex flex-col lg:flex-row text-left'>
                        <Link className='underline' to={`/user/${_id}`}>{firstName} {lastname?? otherName}</Link>
                        <span className='text-primary'>(service provider)</span>
                    </div>
                </div>

                <div className='flex  gap-5 py-2 p-5'>
                    <div className='flex gap-3 items-center'>
                        <FaCalendar className='text-slate-400 text-xl'/>
                        <p>{dateTime.toLocaleDateString()}</p>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <FaClock className='text-slate-400 text-xl'/>
                        <p>{dateTime.toLocaleTimeString()}</p>
                    </div>
                </div>
            </header>

            {/* body */}
            {
                status === 'pending'? (
                    <div className='p-2'>
                        <button className='btn-dark bg-primary w-full'>Cancel</button>
                    </div>
                ): (null)
            }
        </article>
    )
}

HiringItem.propTypes = {
    hiring: PropTypes.object.isRequired
}

export default HiringItem