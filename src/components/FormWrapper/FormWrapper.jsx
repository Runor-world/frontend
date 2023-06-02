import React from 'react'
import PropTypes from 'prop-types'
import './FormWrapper.css'


const FormWrapper = ({children, title, formik,}) => {
  return (
    <div className='form-wrapper'>
        <form onSubmit={formik.handleSubmit}>
            <h3 className='text-black my-2'>{title}</h3>
            {children}
        </form>
    </div>
  )
}

FormWrapper.propTypes = {}

export default FormWrapper