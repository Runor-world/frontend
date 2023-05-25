import React from 'react'
import PropTypes from 'prop-types'
import ServiceCategory from '../ServiceCategory/ServiceCategory'

const ServiceCategoryList = ({services}) => {
  return (
    <section 
        className='flex flex-row lg:flex-col gap-2 justify-start lg:items-start items-center overflow-x-auto w-screen lg:w-full h-auto p-2 py-5'
        >
            {
                services.map( service => <ServiceCategory service={service}  key={service._id} />)
            }
    </section>
  )
}

ServiceCategoryList.propTypes = {
  services: PropTypes.array.isRequired
}

export default ServiceCategoryList