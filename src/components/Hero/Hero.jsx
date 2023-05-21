import React from 'react'
import topRight from '../../images/hero-top-right.png'
import topLeft from '../../images/hero-top-left.png'
import bottomRight from '../../images/hero-bottom-right.png'
import bottomLeft from '../../images/hero-bottom-left.png'
import center from '../../images/hero-large-center.png'
import './Hero.css'
import { useRef, useEffect } from 'react'
import { useState } from 'react'


const Hero = () => {
    const imagesWrapper = useRef(null)
    const [represh, setRepresh] = useState(false)

    useEffect(() => {
        const timeOut = setTimeout(()=>{
            imagesWrapper.current.childNodes.forEach(element => {
                let index = Math.floor((Math.random()*5)+1)
                element.style.zIndex = index
            });
            setRepresh(!represh)
        }, 5000)
        return () => {
            clearTimeout(timeOut)
        }
    }, [represh])
    

    return (
        <div className='hero-wrapper'>
            <section>
                <h1>Hire the world</h1>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                    Reiciendis iusto dolore sequi blanditiis? Omnis ipsa, 
                    consequuntur illum dignissimos odio exercitationem vel quas hic ullam quos officiis. 
                    Eum vitae qui magnam!
                </p>
            </section>
            <section className='hero-images' ref={imagesWrapper}>
                <img src={topLeft} alt="top-left" className='top-left'/>
                <img src={topRight} alt='top-right' className='top-right'/>
                <img src={center} alt="centre" className='center'/>
                <img src={bottomLeft} alt='bottom-left' className='bottom-left' />
                <img src={bottomRight} alt='bottom-right' className='bottom-right'/>
            </section>
        </div>
    )
}

export default Hero