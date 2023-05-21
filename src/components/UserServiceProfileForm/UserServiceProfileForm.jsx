import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './UserServiceProfile.css'
import FormInputError from '../FormInputError/FormInputError'
import FormError from '../FormError/FormError'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createUserServiceProfile } from '../../features/profile/profileSlice'


const UserServiceProfileForm = ({services}) => {
    const navigate = useNavigate()

    const {message} = useSelector(store => store.profile)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            service: null,
            accountType: '',
        },
        validationSchema: Yup.object({
            service: Yup.string().required('Select a service'),
            accountType: Yup.string().min(2, "Must be atlest 2 characters").required('Select account type'),
        }),
        onSubmit: async(values) => {
            // do something on submit
            const newValues = {...values, service: JSON.parse(values.service)}
            try {
                const res = await dispatch(createUserServiceProfile(newValues)).unwrap()
                setTimeout(()=>{
                    navigate('/profile')
                }, 1000)
            } catch (error) {
                console.log(error)
            }
        }
    })

    return (
        <div className='service-profile-form'>
            {/* <h2 className='font-bold text-center'>Configure your account</h2> */}
            <form onSubmit={formik.handleSubmit}>
                <FormError message={message}/>
                <div className='form-group'>
                    <label htmlFor='accountType'>Who are you ?</label>
                    <select 
                        id='accountType'
                        {...formik.getFieldProps('accountType')}
                    >
                        <option 
                            defaultValue={''}  
                            className='text-slate-300'>---Select account type---
                        </option>
                       <option value={'service consumer'}>Service consumer (only hire)</option>
                       <option value={'service man'}>Service man (hire and serve)</option>
                       <option value={'business'}>Business (many services)</option>
                    </select>
                    <FormInputError 
                        isTouched={formik.touched.accountType}
                        errorMessage={formik.errors.accountType}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='firstname'>Select service of interest</label>
                    <select 
                        id='service'
                        {...formik.getFieldProps('service')}
                    >
                        <option defaultValue={''} className='text-slate-300'>---Select a service---</option>
                        {
                            services.map( service => <option value={JSON.stringify(service)} key={service.name}>{service.name}</option>)
                        }
                    </select>
            
                    <FormInputError 
                        isTouched={formik.touched.service}
                        errorMessage={formik.errors.service}
                    />
                </div>

                
                <div className='w-full flex justify-between gap-4 py-2'>
                    <Link 
                        className='bg-white text-primary p-2 rounded-md flex-1'
                        to={'/profile'}
                        >Not now
                    </Link>

                    <input 
                        type='submit' 
                        value={'Submit'}
                        className='bg-slate-500 text-white p-2 rounded-md flex-1 border-2' />                
                </div>
            </form>
        </div>
    )
}

export default UserServiceProfileForm