import React from 'react'
import PropTypes from 'prop-types'
import CardButton from '../CardButton/CardButton'

const ServiceCategory = ({service}) => {
    return (
        <CardButton 
            extraStyle='bg-slate-100 text-slate-600 border-2 border-primary my-0 underline'
            text={service.name} 
            key={service._id}
            path={`categories/${service.name}`}
        />
    )
}

ServiceCategory.propTypes = {
    service: PropTypes.object.isRequired
}

export default ServiceCategory