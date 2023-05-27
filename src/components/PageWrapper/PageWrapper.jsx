import React from 'react'
import PropTypes from 'prop-types'

const PageWrapper = ({children}) => {
  return (
    <div className='w-full overflow-x-hidden'>{children}</div>
  )
}

PageWrapper.propTypes = {
    children : PropTypes.array.isRequired
}

export default PageWrapper