import React from 'react'
import './UserStatusUpdateModal.css'
import { useDispatch, useSelector } from 'react-redux'
import { closeUserModal } from '../../features/user/userSlice'


const UserStatusUpdateModal = ()=> {
    const { selectedUser } = useSelector( store => store.users)
    const {active, role, lastName, firstName, profile} = selectedUser
    const dispatch = useDispatch()

    const handleClick = () =>{
    }

    const handleClose = () =>{
        dispatch(closeUserModal())
    }

    return (
        <div className='status-modal'>
            <h3 className='font-medium'>Are you sure {`${active? 'suspend': 'activate'} this user? `} </h3>
            <div className='flex flex-col gap-4 justify-center items-center bg-slate-100 p-4 rounded-md'>
                <div>
                    <img 
                        src={profile?.photo} 
                        alt={firstName} 
                        className='h-20 w-20 md:w-40 md:h-40 rounded-full ring-2'
                    />
                </div>
                <div className='flex flex-col'>
                    <span className='font-medium'>{firstName} {lastName} (<span>{role}</span>)</span>
                </div>
            </div>
            
            <div className='flex justify-between items-center'>
                <button  
                    onClick={handleClick}
                    className='btn-dark px-5'
                    >Yes</button>
                <button onClick={handleClose} className='btn'>Cancel</button>
            </div>
        </div>
    )
}

export default UserStatusUpdateModal