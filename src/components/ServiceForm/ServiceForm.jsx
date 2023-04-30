import React, {useEffect} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FormInputError from '../FormInputError/FormInputError'
import FormError from '../FormError/FormError'
import { useDispatch, useSelector } from 'react-redux'
import './ServiceForm.css'
import { createService, closeForm, updateService, setMessage } from '../../features/service/serviceSlice'

import { FaTimes } from 'react-icons/fa'

const ServiceForm = () => {
    
    
    const dispatch = useDispatch()
    const {message, selectedService, isLoading} = useSelector( store => store.service)

    const formik = useFormik({
        initialValues: selectedService? {...selectedService} : { name: '', description: '', active: false},
        validationSchema: Yup.object({
            name: Yup.string().min(2, 'Name must be 5 or more characters').required('Name is required'),
            description: Yup.string().min(2, 'description must be 10 or more characters').required('Description is required'),
            active: Yup.boolean('Select a status for the service').required('Status is required')
        }),
        onSubmit: async(values)=>{
            // save personal profile
            try {
                if(selectedService){
                    const res = await dispatch(updateService(values)).unwrap()
                    return
                }
                const res = await dispatch(createService(values)).unwrap()
                // setOpen(false)
            } catch (error) {
                console.log(error)
            }
        }
    })

  return (
    <div className='p-profile-edit-form'>
        <FaTimes 
            className='text-4xl text-white p-2 rounded-full bg-slate-500 absolute -right-3 -top-3'
            onClick={()=> dispatch(closeForm())}
        />
        <h1 className='text-xl font-bold mb-2'>New service</h1>
        <form onSubmit={formik.handleSubmit}>
            <FormError message={message}/>
            <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input 
                    type='text' 
                    id='name'
                    {...formik.getFieldProps('name')}
                />
                <FormInputError 
                    isTouched={formik.touched.name}
                    errorMessage={formik.errors.name}
                />
            </div>

            <div className='form-group'>
                <label htmlFor='description'>Description</label>
                <textarea 
                    type='text' 
                    id='description'
                    {...formik.getFieldProps('description')}
                />
                <FormInputError 
                    isTouched={formik.touched.description}
                    errorMessage={formik.errors.description}
                />
            </div>

            
            <div className='form-group'>
                <label htmlFor='status'>Service status</label>
                <select id="status"
                    {...formik.getFieldProps('active')}
                >
                    <option value="false">Inactive</option>
                    <option value="true">Active</option>
                </select>
             
                <FormInputError 
                    isTouched={formik.touched.status}
                    errorMessage={formik.errors.status}
                />
            </div>

            <div className='flex justify-between gap-4'>
                <input className='flex-1 p-2 rounded-md bg-primary bg-black' type='submit' value='Save' disabled={isLoading}/>
            </div>
        </form>
    </div>
  )
}

export default ServiceForm