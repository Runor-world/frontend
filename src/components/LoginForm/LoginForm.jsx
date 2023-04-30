import React, {useEffect, useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, localLogin } from '../../features/auth/authSlice'
import FormError from '../FormError/FormError'
import './LoginForm.css'
import FormInputError from '../FormInputError/FormInputError'
import { Link, useLocation } from 'react-router-dom'
import googleIcon from '../../images/google-icon.png'
import facebookIcon from '../../images/facebook-icon.png'
import { FaSpinner } from 'react-icons/fa'

const LoginForm = () => {
    const dispatch = useDispatch()
    const { message } = useSelector( store => store.auth) 
    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(8, "Must be at least 8 characters").required("Password required")
            .matches(/[a-z]+/, "Must contain atleast one lowercase character")
            // .matches(/[A-Z]+/, "One uppercase character")
            // .matches(/[@$!%*#?&]+/, "One special character")
            .matches(/\d+/, "Must contain atleast one number")
        }),
        onSubmit: async(values) => {
            setIsLoading(true)
            try {
                const res = await dispatch(localLogin(values)).unwrap()
                localStorage.setItem('token', res.token)
                setIsLoading(false)
            } catch (error) {
                console.log('login error: ', error)
                setIsLoading(false)
            }
        }
    })

    useEffect(() => {
        dispatch(clearMessage())
    }, [])
    
    const facebookLogin = async() => {
        window.open('https://runor-backend.onrender.com/api/auth/facebook', '_self')
    }
    const googleLogin = async() => {
        window.open('https://runor-backend.onrender.com/api/auth/google', '_self')
    }
    const {pathname} = useLocation()
    return (
        <div className='login'>
            <div className='my-10 flex items-center justify-evenly uppercase'>
                <Link to='/signup'  className={`text-center text-xl w-full bg-slate-100 p-2 border-b-2 underline `}>Sign up</Link>
                <h2 className={`text-center text-xl w-full p-2 ${pathname==='/login'? ' border-b-2 border-primary uppercase': ''}`}>Login</h2>
            </div>
            <h2 className='font-semibold'>Log into your account</h2>

            <form onSubmit={formik.handleSubmit}>
                <FormError message={message}/>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input 
                        type='email' 
                        id='email'
                        {...formik.getFieldProps('email')}
                    />
                    <FormInputError 
                        isTouched={formik.touched.email}
                        errorMessage={formik.errors.email}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input 
                        type='password'
                        id='password'
                        {...formik.getFieldProps('password')}
                    />
                    <FormInputError 
                        isTouched={formik.touched.password}
                        errorMessage={formik.errors.password}
                    />
                </div>

                <div className='flex justify-between text-sm text-slate-700'>
                    <div className='flex gap-1 items-center'>
                        <input type='checkbox' id='remember-me'/>
                        <label htmlFor='remember-me'>Remember me</label>
                    </div>
                    <Link to='/forgot-password' className='underline'>Forgot password?</Link>
                </div>

                <div className='flex justify-between items-center mt-5'>
                    <button 
                        className={`flex gap-2 items-center p-2 rounded-full font-bold text-white text-center my-4 px-4 btn ${isLoading? 'bg-slate-300': 'bg-primary'}`}
                        type='submit'
                        disabled={isLoading}
                        >
                            { isLoading? (
                                    <>
                                        <FaSpinner className='animate-spin text-white text-xl'/> Logging in
                                    </>
                                ): 'Submit' 
                            }
                
                    </button> 
                    <div className='flex gap-2 items-center'>
                        <p>Login using</p>
                        <Link onClick={facebookLogin}>
                            <img src={facebookIcon} alt='google-icon' className='social-link' />
                        </Link>
                        <Link onClick={googleLogin}>
                            <img src={googleIcon} alt='google-icon' className='social-link' />
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginForm