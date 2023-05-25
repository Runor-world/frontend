import React from 'react'
import PropTypes from 'prop-types'
import './ModalWrapper.css'
import { FaTimes } from 'react-icons/fa'

const ModalWrapper = ({children, width}) => {
  return (
    <div className={`w-${width} modal-wrapper`} >
        <div className='relative'>
        </div>
        <FaTimes className='text-white text-xl absolute -top-10 z-60 right-0' />
        {children}
    </div>
  )
}

ModalWrapper.propTypes = {
    children: PropTypes.object.isRequired,
    width: PropTypes.string,
}

ModalWrapper.defaultProps = {
    width: 'full',
}
export default ModalWrapper