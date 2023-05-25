import React from 'react'
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa'

const SearchForm = () => {
  return (
    <form 
        action="" 
        className='flex w-full'
    >
        <div className='relative w-full'>
            <FaSearch 
                className='absolute left-4 top-3 text-slate-400'
            />
            <input 
                type="search" 
                placeholder='Search for something' 
                id='service' 
                className='rounded-full w-full border-[1px] outline-none border-primary p-2 px-10 border-r-1'
            />
        </div>
        {/* <div className='relative'>
            <FaMapMarkerAlt  
                className='input-icon-custom'
            />
            <input 
                type="search" 
                placeholder='Location' 
                id='location'
                className='rounded-r-full border-2 outline-none border-primary p-2 px-10 border-l-0'
            />
        </div> */}
        <input type="submit" className='hidden'/>
    </form>
  )
}

export default SearchForm