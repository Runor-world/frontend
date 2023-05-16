import React from 'react'
import UserListItem from '../UserListItem/UserListItem'


const UserList = ({users}) => {
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