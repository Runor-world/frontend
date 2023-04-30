import React, { useEffect } from 'react'
import CardButton from '../CardButton/CardButton'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Loading/Loading'
import { getServices } from '../../features/service/serviceSlice'

const categories = [
    'Shoe making',
    'Catering',
    'Phone repair',
    'Motor mechanic',
    'Electrical',
    'Dry cleaning',
    'Web development',
    'Mobile development',
    'Tailoring',
    'Decoration'
]

const WorkerCategories = () => {
    const dispatch = useDispatch()
    const {services, isLoading} = useSelector( store => store.service)
    
    useEffect(() => {
      dispatch(getServices())
    }, [])
    

    if(isLoading) {
        return <Loading />
    }
    return (
        <section 
            className='flex flex-col gap-3 lg:gap-10 justify-between bg-slate-200 main-x-p main-y-p group'
        >
            <div className='flex flex-col items-center lg:items-start'>
                <h2 
                    className='text-center lg:text-left text-3xl lg:text-4xl font-extrabold'
                    >
                    Discover workers by categories
                </h2>
                <hr 
                    className='border-8 rounded-lg border-primary w-[50%] lg:w-[23%] my-2 group-hover:w-10 transition-slow'
                />
            </div>
            <div 
                className='flex flex-wrap gap-2 justify-center items-center flex-2'
            >
                {
                    services.length > 0 ? (
                        services.map(service => 
                            <CardButton 
                                extraStyle='bg-slate-100 text-slate-600 border-2 border-primary my-0 underline'
                                text={service.name} 
                                key={service._id}
                                path={`categories/${service.name}`}
                            />
                        )
                    ): <p>Oops there are no services</p>
                }
            </div>
        </section>
    )
}

export default WorkerCategories