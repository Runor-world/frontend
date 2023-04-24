import React from 'react'
import { FaEdit, FaPen } from 'react-icons/fa'

const Service = ({name, description, active}) => {
  return (
    <article className='flex justify-between items-center bg-slate-100 rounded-sm shadow-sm p-2 py-4'>
        <p className='font-semibold'>{name}</p>
        <p className='hidden lg:inline'>{description.length > 40? `${description.substring(0, 40)}...`: description}</p>
        <p>{active? 'Active': 'Suspended'}</p>
        <button className='btn px-4 flex items-center gap-2'><FaPen /></button>
    </article>
  )
}

export default Service