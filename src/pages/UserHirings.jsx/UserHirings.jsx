import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import Header from '../../components/Header/Header'
import MainContentWrapper from '../../components/MainContentWrapper/MainContentWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { getAllHiringsByUser } from '../../features/hiring/hiringSlice'
import Loading from '../../components/Loading/Loading'
import HiringItem from '../../components/HiringItem/HiringItem'
import CardButton from '../../components/CardButton/CardButton'
import ScrollableItemsWrapper from '../../components/ScrollableItemsWrapper/ScrollableItemsWrapper'

const status = ['pending', 'in progress', 'completed', 'cancelled']

const UserHirings = props => {
    const {hirings, isLoading} = useSelector( store => store.hiring)
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(getAllHiringsByUser())
    }, [])

    if(isLoading){
        return <Loading />
    }
    return (
        <PageWrapper>
            <Header />
            <MainContentWrapper>
                <section className='grid grid-col lg:grid-cols-4 w-full gap-5 items-start mb-10'>
                    <div className='flex col-span-full lg:col-span-1 flex-col gap-5'>
                        <h2 className=''>Filter by status</h2>
                        <ScrollableItemsWrapper>
                            {
                                status.map( item => {
                                    return(
                                        <CardButton 
                                            extraStyle='bg-slate-100 text-slate-600 border-2 border-primary my-0 underline'
                                            text={item} 
                                            key={item}
                                            
                                        />
                                    )
                                })
                            }
                        </ScrollableItemsWrapper>
                    </div>
                    <div className='col-span-full lg:col-span-3 w-full justify-center'>
                        <div className='flex gap-1 items-center'>
                            <h3 className='text-lg font-bold'>Hirings
                            </h3>
                            <div className='flex items-center justify-center ring-2 rounded-full w-5 p-1 h-5 m-2 text-primary font-normal'>
                                <small className='text-center'>{hirings.length}</small>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 mt-5 pr-4'>
                            {
                                hirings.map( hiring => <HiringItem key={hiring._id} hiring={hiring} />)
                            }
                        </div>
                    </div>
                </section>
            </MainContentWrapper>
        </PageWrapper>
    )
}

UserHirings.propTypes = {}

export default UserHirings