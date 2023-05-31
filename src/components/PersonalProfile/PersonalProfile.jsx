import React from 'react'
import './PersonalProfile.css'
import { Link } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'


const PersonalProfile = ({personalProfile, user, setOpen}) => {
    
    return (
        <section className='wrapper text-left'>
            <div className='flex gap-2 items-center justify-center'>
                <h2 className='font-bold text-center'>Personal profile</h2>
                
                <FaEdit  onClick={()=>setOpen(true)} className='profile-link-round '/>
            </div>
            <article >
                <small className='text-primary'>First name</small>
                <hr />
                <p>{user.firstName}</p>
            </article>
            <article>
                <small className='text-primary'>Other name</small>
                <hr />
                <p>{user.otherName}</p>
            </article>
            <article>
                <small className='text-primary'>Email</small>
                <hr />
                <p>{user.email}</p>
            </article>
            <article>
                <small className='text-primary'>Phone number</small>
                <hr />
                <p>{user.phoneNumber}</p>
            </article>
            <article>
                <small className='text-primary'>Location</small>
                <hr />
                <p>{user.location}</p>
            </article>
            <>
                <article>
                    <small className='text-primary'>City</small>
                    <hr />
                    <p>{personalProfile.city}</p>
                </article>
                <article>
                    <small className='text-primary'>Country</small>
                    <hr />
                    <p>{personalProfile.country}</p>
                </article>
                <article>
                    <small className='text-primary'>Birthday</small>
                    <hr />
                    <p>{personalProfile.birthday}</p>
                </article>
                <article>
                    <small className='text-primary'>Bio</small>
                    <hr />
                    <p>{personalProfile.bio}</p>
                </article>
            </>
        </section>
    )
}

export default PersonalProfile