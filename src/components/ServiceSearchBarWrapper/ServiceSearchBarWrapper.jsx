import React from 'react'
import PropTypes from 'prop-types'

const ServiceSearchBarWrapper = ({children}) => {
  return (
    <section className='w-full main-x-p mt-20 lg:mt-40 flex flex-col justify-center gap-10 py-5'>
        {children}
    </section>
  )
}

ServiceSearchBarWrapper.propTypes = {
    children: PropTypes.object.isRequired
}

export default ServiceSearchBarWrapper