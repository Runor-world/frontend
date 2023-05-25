import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'


const Brand = () => {
  return (
    <Link 
        className='flex items-center'
        to='/home'
    > 
        <img src={logo} alt='logo' className='h-[30px] lg:h-[50px]'/>
        <h2 className='text-2xl font-bold'>Runor</h2>
    </Link>
  )
}

export default Brand