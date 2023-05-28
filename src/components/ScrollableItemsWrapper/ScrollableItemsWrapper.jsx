import React from 'react'
import PropTypes from 'prop-types'

const ScrollableItemsWrapper = ({children}) => {
  return (
    <section 
        className='flex flex-row lg:flex-col gap-2 justify-start lg:items-start items-center overflow-x-auto w-screen lg:w-full h-auto p-2 py-5'
        >
            {children}
    </section>
  )
}

ScrollableItemsWrapper.propTypes = {
    children: PropTypes.object.isRequired
}

export default ScrollableItemsWrapper