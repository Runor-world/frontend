import React from 'react'
import PropTypes from 'prop-types'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import { Link } from 'react-router-dom'
import { FaCopy, FaEnvelope, FaPhone } from 'react-icons/fa'
import Header from '../../components/Header/Header'

const HiringCompleted = ({serviceProvider}) => {
    const {lastName, firstName, otherName, email, phone} = serviceProvider.user
  return (
    <PageWrapper>
        <Header />
        <div className='flex flex-col gap-5 items-center'>
            <div className='flex flex-col gap-2 items-center w-full p-2'>
                <div className='my-2 text-xl font-semibold'>
                    <p>Hiring done successfully!</p>
                </div>
                <p>
                    You may contact <q>{firstName} {lastName??otherName}</q> via:
                </p>
                
                <ul className='my-2 bg-slate-0 flex flex-col gap-2'>
                    <li className='flex items-center gap-2'>
                        <FaEnvelope className='text-primary' /> {email}
                        <FaCopy className='text-slate-500'/>
                    </li>
                    <li className='flex items-center gap-2'>
                        <FaPhone className='text-primary' /> {phone?? '09000000000000'} 
                        <FaCopy className='text-slate-500'/>
                    </li>

                </ul> 
            </div>
            <Link className='btn-primary bg-primary px-4 w-full text-center text-white' to={'/'}>Done</Link>
        </div>
    </PageWrapper>
  )
}

HiringCompleted.propTypes = {}

export default HiringCompleted