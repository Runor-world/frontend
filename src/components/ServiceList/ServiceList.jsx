import React from 'react'
import Service from '../Service/Service'

const ServiceList = ({services}) => {
  return (
    <div className='flex flex-col gap-2'>
        {
            services.map( service => <Service key={service._id} {...service} />)
        }
    </div>
  )
}

export default ServiceList