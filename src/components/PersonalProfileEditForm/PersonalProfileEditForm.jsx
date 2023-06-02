import React, {useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FormInputError from '../FormInputError/FormInputError'
import './PersonalProfileEditForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../features/profile/profileSlice'
import { FaTimes } from 'react-icons/fa'
import ModalWrapper from '../ModalWrapper/ModalWrapper'

const PersonalProfileEditForm = ({setOpen}) => {
    const {personalProfile} = useSelector( store=> store.profile)
    const {user} = useSelector( store => store.auth)
    const dispatch = useDispatch()
    
    const formik = useFormik({
        initialValues:{
            firstName: user.firstName,
            otherName: user.otherName,
            address: user.location,
            city: personalProfile.city,
            country: personalProfile.country,
            bio: personalProfile.bio,
            dateOfBirth: personalProfile.birthday
        },
        validationSchema: Yup.object({
            firstName: Yup.string().min(2, 'First name must be 2 or more characters').required('First name is required'),
            otherName: Yup.string().min(2, 'Other name must be 2 or more characters').required('Other name is required'),
            city: Yup.string().min(2, 'City must be 2 or more characters').required('City is required'),
            country: Yup.string().min(2, 'Country must be 2 or more characters').required('Country is required'),
            dateOfBirth: Yup.date().required('Date of birth is required'),
            address: Yup.string().min(10, 'Address must be 10 or more characters').required('Address is required'),
            bio: Yup.string().min(20, 'Bio must be 20 or more characters').required('Bio is required')
        }),
        onSubmit: async(values)=>{
            // save personal profile
            try {
                const res = await dispatch(updateProfile(values)).unwrap()
                setOpen(false)
            } catch (error) {
                console.log(error)
            }
        }
    })

  return (
    <div className='p-profile-edit-form'>
        <FaTimes 
            className='text-4xl text-white p-2 rounded-full bg-slate-500 absolute -right-3 -top-3'
            onClick={()=>setOpen(false)}
        />
        <h1 className='text-xl font-bold mb-2'>Edit profile</h1>
        <form onSubmit={formik.handleSubmit}>
            {/* <FormError message={message}/> */}
            <div className='form-group'>
                <label htmlFor='firstname'>First name</label>
                <input 
                    type='text' 
                    id='firstname'
                    {...formik.getFieldProps('firstName')}
                />
                <FormInputError 
                    isTouched={formik.touched.firstName}
                    errorMessage={formik.errors.firstName}
                />
            </div>

            <div className='form-group'>
                <label htmlFor='othername'>Other name</label>
                <input 
                    type='text' 
                    id='othername'
                    {...formik.getFieldProps('otherName')}
                />
                <FormInputError 
                    isTouched={formik.touched.otherName}
                    errorMessage={formik.errors.otherName}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='city'>Address</label>
                <input 
                    type='text' 
                    id='address'
                    {...formik.getFieldProps('address')}
                />
                <FormInputError 
                    isTouched={formik.touched.address}
                    errorMessage={formik.errors.address}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='city'>City</label>
                <input 
                    type='text' 
                    id='city'
                    {...formik.getFieldProps('city')}
                />
                <FormInputError 
                    isTouched={formik.touched.city}
                    errorMessage={formik.errors.city}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='city'>Country</label>
                <input 
                    type='text' 
                    id='country'
                    {...formik.getFieldProps('country')}
                />
                <FormInputError 
                    isTouched={formik.touched.country}
                    errorMessage={formik.errors.country}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='city'>Bio</label>
                <textarea
                    rows='7' 
                    cols='50'
                    id='bio'
                    {...formik.getFieldProps('bio')}
                />
                
                <FormInputError 
                    isTouched={formik.touched.bio}
                    errorMessage={formik.errors.bio}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='dateOfBirth'>Date of birth</label>
                <input 
                    type='date' 
                    id='dateOfBirth'
                    {...formik.getFieldProps('dateOfBirth')}
                />
                <FormInputError 
                    isTouched={formik.touched.dateOfBirth}
                    errorMessage={formik.errors.dateOfBirth}
                />
            </div>
            <div className='flex justify-between gap-4 my-3'>
                <input className='btn-dark bg-primary flex-1 border-2 border-primary' type='submit' value='Save'/>
                <button onClick={()=>setOpen(false)} className='btn-dark bg-slate-200 text-primary flex-1 font-semibold'>close</button>
            </div>
        </form>
    </div>

  )
}

export default PersonalProfileEditForm