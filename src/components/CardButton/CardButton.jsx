import React from 'react'
import { Link } from 'react-router-dom'

const CardButton = ({text, path, extraStyle}) => {
  return (
    <Link 
        to={path} 
        className={`whitespace-nowrap shadow-md shadow-slate-400 transition-slow no-underline py-2 px-7 block my-2 text-center bg-primary text-white rounded-full hover:bg-black hover:text-primary ${extraStyle}`}
    >
        {text}
    </Link>
  )
}

export default CardButton