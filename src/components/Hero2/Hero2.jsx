import React from 'react'
import { useRef, useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import center from '../../images/hero-large-center.png'


const Hero = () => {
    const imagesWrapper = useRef(null)
    const [represh, setRepresh] = useState(false)

    useEffect(() => {
        const timeOut = setTimeout(()=>{
            imagesWrapper.current.childNodes.forEach(element => {
                let index = Math.floor((Math.random()*5)+1)
                element.style.zIndex = index
                console.log(index)
            });
            setRepresh(!represh)
        }, 5000)
        return () => {
            clearTimeout(timeOut)
        }
    }, [represh])
    

    return (
        <section 
            className='flex flex-col lg:flex-row justify-between items-center main-x-p py-10 relative h-auto gap-5 pb-20'
        >
            <div 
                className='flex flex-col justify-center item-center lg:items-start text-center lg:text-left'
            >
                <h1 
                    className='text-primary text-4xl lg:text-7xl font-extrabold'
                >
                    Hire the world
                </h1>
                <h2 
                    className='text-slate-500 text-xl lg:text-3xl font-bold'
                >
                    Whenever you are ready
                </h2>
                <p 
                    className='my-5 lg:my-10 lg:w-[80%]'
                >
                    Hire helpers, get assistance, 
                    save time and pay as go on the hourney of hiring the world
                </p>
                <Link 
                    to='/LoginPages' 
                    className='shadow-md shadow-slate-400 transition-slow no-underline py-1 md:py-2 px-7 text-center mx-auto lg:mx-0 w-1/2 bg-primary font-bold text-white rounded-full hover:bg-black hover:text-primary'
                >
                    Get Started
                </Link>
            </div>
            <div 
                className='lg:w-[50%] w-full'
            >
                <img 
                    src={center} 
                    alt="hero-show" 
                    className='h-[300px] w-[100%] rounded-full'
                />
            </div>
        </section>
    )
}

export default Hero