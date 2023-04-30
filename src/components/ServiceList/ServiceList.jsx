import React from 'react'
import './ServiceList.css'
import Service from '../Service/Service'

const ServiceList = ({services}) => {
  return (
    <React.Fragment>
        {
          services.length < 1 ?
          (
              <div className='flex flex-col items-center justify-center place-self-center p-2 rounded-md bg-slate-100 mt-5'>
                  <p className='text-center font-semibold'>You have not added services</p>
              </div>
          ):
          <table className='table-auto border-1 overflowx-scroll'>
            <thead>
              <tr className='text-left border-b-2 px-4 p-2 col bg-primary text-white'>
                <th>Name</th>
                <th>Description</th>
                <th>Active</th>
                <th>Edit</th>
              </tr>
            </thead>

            <tbody>
              {
                  services.map( service => <Service key={service._id} {...service} />)
              }
            </tbody>
          </table>
      }
    </React.Fragment>
  )
}

export default ServiceList