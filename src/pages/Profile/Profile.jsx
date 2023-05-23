import React, {useEffect, useState} from 'react'
import { FaEdit, FaPen, FaUserEdit } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import { getAllProfiles, updateProfileBackgroundPhoto, updateProfilePhoto } from '../../features/profile/profileSlice'
import userIcon from '../../images/user.png'
import './Profile.css'
import PersonalProfile from '../../components/PersonalProfile/PersonalProfile'
import PersonalProfileEditForm from '../../components/PersonalProfileEditForm/PersonalProfileEditForm'
import PhotoEdit from '../../components/PhotoEdit/PhotoEdit'
import Loading from '../../components/Loading/Loading'


const Profile = () => {
    const {user} = useSelector(store => store.auth)
    const {isLoading, personalProfile, serviceProfile} = useSelector(store => store.profile)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [showImageUploader, setShowImageUploader] = useState(false)
    const [showUserImageUploader, setShowUserImageUploader] = useState(false)

    useEffect(() => {
        dispatch(getAllProfiles())
    }, [])

    if(isLoading){
        return( 
            <Loading />
        )
    }
    return (
        <div className='profile bg-white text-black relative'>
            <Header />
            <div className='relative mt-16'>
                <header className='profile-header'>
                    <FaUserEdit 
                        className='text-xl text-primary absolute top-10 right-10 z-30 bg-slate-500 rounded-full p-1 w-[40px] h-[40px]'
                        onClick={()=>setShowImageUploader(true)}
                    />
                    <div 
                        className='absolute text-white z-20 w-full h-full top-0 left-0 text-center flex flex-col gap-4 justify-center items-center'>
                        <h1 className='absolute top-16 font-bold text-2xl'>
                            W<span className='lowercase'>elcome back,</span> {user.firstName} {user.otherName}
                        </h1>
                        {/* <p className='absolute top-24 text-inherit w-full lg:w-2/3 text-center'>{personalProfile? personalProfile.bio: 'Your bio here'}</p> */}
                    </div>
                    <img  src={personalProfile.photo ?? userIcon} alt='user' className='profile-photo'/>
                    <FaPen 
                        className='text-white absolute -bottom-0 z-20 right-1/2 bg-slate-500 rounded-full p-1 w-[30px] h-[30px]'
                        onClick={()=>setShowUserImageUploader(true)}
                    />
                    
                    {/* overlay here */}
                    <div className='w-full h-1/2 fixed top-0 left-0 z-10'>
                        <img 
                            src={personalProfile?.backgroundPhoto ?? userIcon} 
                            alt='background' 
                            className='w-full h-full object-cover' 
                        />
                    </div>
                </header>
                <div className='profile-body'>
                    <PersonalProfile personalProfile={personalProfile} user={user} setOpen={setOpen}/>
                    { 
                        open && <PersonalProfileEditForm setOpen={setOpen}/>
                    }
                    <section className='wrapper text-left'>
                        <div className='flex gap-2 items-center justify-center'>
                            <h2 className='font-bold text-center'>Service profile</h2>
                            { serviceProfile? (
                                    <Link className='profile-link-round '>
                                        <FaEdit />
                                    </Link>
                                ): null
                            }
                        </div>
                        {
                            serviceProfile? (
                                <>
                                    <article>
                                        <small className='text-primary'>Account type </small>
                                        <hr />
                                        <p>{serviceProfile.accountType}</p>
                                    </article>
                                    <ol className='flex flex-col gap-4'>
                                        <small className='text-primary'>Offerred/consumed Services ({serviceProfile.services.length})</small>
                                        <hr />
                                    {
                                        serviceProfile.services.map( (service, index) =>{
                                            return (
                                                <li className='bg-white p-2 relative'>
                                                    <span 
                                                        className='absolute -top-2 -left-2 ring-2 ring-primary w-5 h-5 text-center bg-white shadow-md text-primary rounded-full'>
                                                            {index + 1}
                                                    </span>
                                                    <article>
                                                        <small className=''>Service name</small>
                                                        <hr />
                                                        <p>{service.name}</p>
                                                    </article>
                                                    <article>
                                                        <small className=''>Service Description</small>
                                                        <hr />
                                                        <p>{service.description}</p>
                                                    </article>
                                                </li>
                                            )
                                        })
                                    }
                                    </ol>
                                </>
                            ):(
                                <div className='text-center flex flex-col gap-2 mt-2'>
                                    <p>Please create service profile to identify yourself as service provider or consumer</p>
                                    <Link 
                                        className='my-2 p-2 px-4 text-white bg-primary rounded-full w-fit m-auto hover:bg-black hover:text-primary'
                                        to='/service-profile'
                                    >
                                        Set service profile
                                    </Link>
                                </div>
                            )
                        }
                        
                    </section>
                </div>
            </div>
            {
                showImageUploader && <PhotoEdit 
                    title={'Background image update/upload'}
                    setShowImageUploader={setShowImageUploader}
                    dispatcher={updateProfileBackgroundPhoto}
                    />
            }
            {
                showUserImageUploader && <PhotoEdit 
                    title={'User image update/upload'}
                    setShowImageUploader={setShowUserImageUploader}
                    dispatcher={updateProfilePhoto}
                    />
            }
        </div>
    )
}

export default Profile