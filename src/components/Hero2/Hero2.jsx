import React from 'react'
import { useRef, useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import center from '../../images/hero-large-center.png'
import heroImage from '../../images/hero-photo.jpg'
import heroImage2 from '../../images/hero-photo2.jpg'


const Hero = () => {
    const [zIndex, setZindex] = useState([10, 20])
    useEffect(() => {
        const timeInterval = setInterval(()=>{
            if(zIndex[0] === 20){
                setZindex([10, 20])
            }else{
                setZindex([20, 10])
            }
        }, 5000)
        return () => {
            clearTimeout(timeInterval)
        }
    }, [zIndex])
    

    return (
        <div className='relative w-full h-screen'>
            <img src={heroImage} className='h-full w-full object-cover'/>
            <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 text-white flex flex-col justify-center'>
                <section 
                    className='grid grid-cols-1 lg:grid-cols-2 main-x-p h-full gap-10 relative content-center'
                >
                    <div 
                        className='flex flex-col lg:pt-5 justify-start item-center lg:items-start text-center lg:text-left'
                    >
                        <h1 
                            className='text-white text-4xl lg:text-7xl font-extrabold animate-bounce'
                        >
                            Hire the world
                        </h1>
                        <h2 
                            className='text-slate-200 text-xl lg:text-3xl font-bold'
                        >
                            Whenever you are ready
                        </h2>
                        <p 
                            className='my-5 lg:my-10 lg:w-[80%]'
                        >
                            Hire helpers, get assistance, 
                            save time and pay as go on the journey of hiring the world
                        </p>
                        <Link 
                            to='/' 
                            className='shadow-md shadow-slate-400 hover:scale-105 transition-slow no-underline py-1 md:py-2 px-7 text-center mx-auto lg:mx-0 w-1/2 bg-primary font-bold text-white rounded-full hover:bg-black hover:text-primary'
                        >
                            Get Started
                        </Link>
                    </div>
                    <div 
                        className='w-full h-full relative'
                    >
                        <img 
                            src={heroImage} 
                            alt="hero-show" 
                            className={`h-[200px] lg:h-full w-full mx-auto object-cover aspect-auto rounded-full scale-110 animate-pulse absolute transition-all duration-200 z-${zIndex[0]}`}
                        />
                        <img 
                            src={heroImage2} 
                            alt="hero-show" 
                            className={`h-[200px] lg:h-full w-full mx-auto object-cover aspect-auto rounded-full scale-110 lanimate-pulse transition-all duration-200 absolute z-${zIndex[1]}`}
                        />
                        
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Hero