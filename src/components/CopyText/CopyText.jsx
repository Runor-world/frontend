import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { FaCopy } from 'react-icons/fa'

const CopyText = ({text, icon}) => {
    const [copy, setCopy] = useState('')

    const isMatch = async() =>{
        const val =  await navigator.clipboard.readText() 
        if(val !==''){
            setCopy(val)
        }
    }

    const handleCopy = async() => {
       await navigator.clipboard.writeText(text)
       isMatch()
    }
    return (
        <div className='flex gap-2 flex-col items-center'>
            <div className='flex items-center gap-2'>
                {icon} <span className='text-xl font-semibold'>{text}</span>
            </div>
            <div onClick={handleCopy} className='bg-slate-400 rounded-md p-1 px-4 hover:scale-105 duration-200 transition-all'>
                <small>{copy === text? 'Copied': 'Click here to copy'}</small> 
                
            </div>
        </div>
    )
}

CopyText.propTypes = {}

export default CopyText