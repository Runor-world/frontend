import React, {useEffect} from 'react'
import UserListItem from '../UserListItem/UserListItem'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchKey } from '../../features/search/searchSlice'
import { userSearchByName } from '../../features/user/userSlice'


const UserList = () => {
    const {search} = useSelector( store => store.search)
    const {users} = useSelector( store => store.users)

    return (
        <React.Fragment>
            {
            users.length < 1 ?
            (
                <div className='flex flex-col items-center justify-center place-self-center p-2 rounded-md bg-slate-100 mt-5'>
                    <p className='text-center'>There are no users yet</p>
                </div>
            ):
            <section className='flex flex-col gap-2'>
                 {
                    users.map( user => <UserListItem key={user._id} {...user} />)
                }
            </section>
        }
        </React.Fragment>
    )
}

export default UserList