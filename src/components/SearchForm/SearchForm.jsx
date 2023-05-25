import React from 'react'
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa'

const SearchForm = () => {
  return (
    <form 
        action="" 
        className='flex w-full'
    >
        <div className='relative'>
            <FaSearch 
                className='input-icon-custom'
            />
            <input 
                type="search" 
                placeholder='keyword' 
                id='service' 
                className='rounded-l-full border-2 outline-none bg-opacity-60 border-primary p-2 px-10 border-r-0 bg-black'
            />
        </div>
        <div className='relative'>
            <FaMapMarkerAlt  
                className='input-icon-custom'
            />
            <input 
                type="search" 
                placeholder='Location' 
                id='location'
                className='rounded-r-full border-2 outline-none border-primary bg-opacity-50 p-2 px-10 border-l-0 bg-black'
            />
        </div>
        <input type="submit" className='hidden'/>
    </form>
  )
}

export default SearchForm