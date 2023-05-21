import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import userIcon from '../../images/user.png'
import DropDown from '../DropDown/DropDown'
import { userDropDown } from '../../data'
import { useState } from 'react'

const NavBar = () => {
    const {user} = useSelector(store => store.auth)
    const [isOpen, setIsOpen] = useState(false)
    const {personalProfile} = useSelector( store => store.profile)
    return (
        <nav className='flex gap-2 px-4'>
            <Link 
                to='/services' 
                className='transition-slow hidden lg:flex no-underline p-2 px-7 text-inherit font-bold rounded-full hover:bg-slate-500'
            >
                Services
            </Link>
            <Link 
                to='/categories' 
                className='transition-slow hidden lg:flex no-underline p-2 px-7 text-inherit font-bold rounded-full hover:bg-slate-500'
            >
                Categories
            </Link>
            <Link 
                to='/aboutus' 
                className='transition-slow hidden lg:flex no-underline p-2 px-7 text-inherit font-bold rounded-full hover:bg-slate-500'
            >
                About us
            </Link>
            {
                user? (
                    <div 
                        className='flex gap-2 items-center'
                        onMouseEnter={()=> setIsOpen(true)}
                        >
                        <img src={personalProfile?.photo ?? userIcon} alt='user-icon'  className='rounded-full w-[50px] h-[40px] shadow-md object-cover'/>
                        {/* <p className='text-primary hidden lg:inline-block'>{user.firstName} {user.otherName}</p> */}
                        {/* {
                            isOpen? <FaChevronUp  className='invisible lg:visible' />:
                            <FaChevronDown  className='invisible lg:visible' />
                        } */}
                        {
                            isOpen ? <DropDown items={userDropDown} setIsOpen={setIsOpen}/>: null
                        }
                    </div>

                ): (
                    <>
                        <Link 
                            to='/login' 
                            className='transition-slow no-underline py-1 md:py-2 px-7 bg-primary text-white rounded-full hover:bg-black hover:text-primary'
                        >
                            Login
                        </Link>
                    </>
                )
            }
        </nav>
    )
}

export default NavBar