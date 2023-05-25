import React, { useState, useEffect } from 'react'
import SearchForm from '../SearchForm/SearchForm'
import NavBar from '../NavBar/NavBar'
import Brand from '../Brand/Brand'
import { FaBars, FaSearch } from 'react-icons/fa'
import { openSidebar } from '../../features/sidebar/sidebarSlice'
import { useDispatch, useSelector } from 'react-redux'
import { showSearchBar } from '../../features/search/searchSlice'

const Header = () => {
    const dispatch = useDispatch()

    const {searchBarVisible} = useSelector( store => store.search)
    const [scroll, setScroll] = useState(0)
    
    // useEffect(() => {
    //     window.addEventListener('scroll', (e)=>{
    //         setScroll(window.scrollY)
    //     })
    // }, [])
    
    return (
        <header 
            className={`flex justify-between items-center main-x-p py-2 lg:py-5 w-screen fixed top-0 left-0 bg-white z-50 shadow-sm shadow-primary ${scroll > 20 ?'bg-opacity-20': 'bg-opacity-100 text-primary'}`}
        >
            <div 
                    className='flex gap-4 items-center'
                >
                    <FaBars 
                        className='text-xl text-primary lg:hidden visible' 
                        onClick={()=>dispatch(openSidebar())}
                    />
                    <Brand />   
            </div>

            {/* <div className='visible lg:hidden'>
                <FaSearch className='text-primary text-xl' onClick={()=> dispatch(showSearchBar())}/>
            </div> */}
            <div className='hidden lg:flex'>
                <SearchForm />
            </div> 

            <div className=''>
                <NavBar />
            </div>
        </header>
    )
}

export default Header