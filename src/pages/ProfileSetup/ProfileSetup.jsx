import React, {useEffect} from 'react'
import UserServiceProfileForm from '../../components/UserServiceProfileForm/UserServiceProfileForm'
import './ProfileSetup.css'
import providerImage from '../../images/electrician.jpg'
import consumerImage from '../../images/cleaner.jpg'
import Header from '../../components/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { getServices } from '../../features/service/serviceSlice'


const ProfileSetup = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getServices())
    }, [])
    
    const {services} = useSelector( store => store.service)

  return (
    <>
        <Header/>
        <div className='profile-setup relative w-screen h-screen'>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
                <img src={providerImage} alt='provider'/>
                <img src={consumerImage} alt='consumer'/>
            </div>
            <div className='overlay main-x-p mt-10 text-center text-black'>
                {/* <h1 className='font-bold text-2xl text-left lg:text-4xl'>Service Profile setting</h1> */}
                <p className='text-xl text-black font-semibold mb-0 text-left lg:text-center'>Set your account accordingly</p>
                <hr className='border-2 rounded-full border-slate-400 w-full lg:w-1/2 mb-4'/>
                <UserServiceProfileForm services={services} />
            </div>
        </div>
    </>
  )
}

export default ProfileSetup