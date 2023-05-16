import React, {useEffect, useState} from 'react'
import UserList from '../../components/UserList/UserList'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, userSearchByName } from '../../features/user/userSlice'
import Loading from '../../components/Loading/Loading'
import UserStatusUpdateModal from '../../components/UserStatusUpdateModal/UserStatusUpdateModal'
import UserSearchBar from '../../components/UserSearchBar/UserSearchBar'

const Users = () => {
    const dispatch = useDispatch()
    const {users, isLoading, isOpened, selectedUser} = useSelector( store => store.users)
    const {search} = useSelector( store => store.search)
    
    useEffect(() => {
        dispatch(userSearchByName(''))
    }, [])

    if(isLoading) {
        return <Loading />
    }
    return (
        <section className='flex flex-col gap-2'>
            <UserSearchBar />
 
            <div className='py-2 bg-slate-100'>
                Filter by 
            </div>

            <div className='flex justify-between items-cetner'>
                <h1 className='text-xl lg:text-xl font-semibold'>Users ({users.length})</h1>
            </div>
            <UserList users={users}/>
            {
                isOpened && <UserStatusUpdateModal {...selectedUser}/>
            }
        </section>
    )
}

export default Users