import React from 'react'

const ListHead = () => {
  return (
    <div className='flex justify-between items-center bg-slate-100 rounded-sm shadow-sm p-2 py-4'>
        <h4 className='font-semibold'>Name</h4>
        <h4 className='font-semibold hidden lg:inline'>Description</h4>
        <h4 className='font-semibold'>Status</h4>
        <h4 className='font-semibold'>Edit</h4>
    </div>
  )
}

export default ListHead