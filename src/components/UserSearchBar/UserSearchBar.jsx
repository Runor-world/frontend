import React from 'react'
import PropTypes from 'prop-types'

const UserSearchBar = () => {
  return (
    <div>
        <form>
            <input 
                type='search' 
                placeholder="Enter user's name"
                className='rounded-md outline-none p-2 px-4 border-2 w-full lg:w-1/3 '
            />
        </form>
    </div>
  )
}

UserSearchBar.propTypes = {}

export default UserSearchBar