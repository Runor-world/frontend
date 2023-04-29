import React from 'react'
import { Link } from 'react-router-dom'
import './DropDown.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../../features/auth/authSlice'
import { baseUrl } from '../../utils/base_url'
import { FaTimes } from 'react-icons/fa'
import userIcon from '../../images/user.png'

const DropDown = ({items, setIsOpen}) => {

    const dispatch = useDispatch()
    const {user} = useSelector( store => store.auth)
    const {personalProfile} = useSelector( store => store.profile)

    const logout = async() =>{
        window.open(`${baseUrl}/api/auth/logout`, '_self')
        // window.open('http://localhost:8000/api/auth/logout', '_self')
        document.cookie = null
        try {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            const res = await dispatch(clearUser())
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ul className='drop-down' onMouseLeave={()=> setIsOpen(false)}>
            <FaTimes className='visible lg:hidden text-xl absolute right-2 top-2' onClick={()=> setIsOpen(false)}/>
            <div className='p-2 flex gap-2 items-center'>
                <img src={personalProfile?.photo ?? userIcon} alt='user-icon'  className='rounded-full w-[50px] h-[40px] shadow-md object-cover'/>
                <li className='item border-b-2 font-semibold'>{user.firstName} {user.otherName}</li>
            </div>
            {items.map((item, index) =>{
                if(item.text === 'Dashboard' && user.role == 'admin'){
                    return null
                }
                if(item.url === '/logout'){
                    return(
                        <li className='item' key={index}>
                            <Link onClick={logout}>{item.text}</Link>
                        </li>
                    )
                }else{
                    return (
                        <li className='item' key={index}>
                            <Link to={item.url}>{item.text}</Link>
                        </li>
                    ) 
                }
            }
            )}
        </ul>
    )
}

export default DropDown