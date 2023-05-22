import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userSearchByName } from '../../features/user/userSlice'
import { setSearchKey } from '../../features/search/searchSlice'

const UserSearchBar = () => {
  const [key, setKey] = useState("")
  const dispatch = useDispatch()
  const {search} = useSelector( store => store.search)

  const handleChange = (e) => {
    setKey(e.target.value)
    dispatch(userSearchByName(key))
  }

  const handleSubmit = (e) =>{
    e.preventDefault(true)
    dispatch(userSearchByName(key))
  }

  useEffect(()=>{}, [])

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input 
                type='search' 
                name='key'
                placeholder="Enter user's name"
                className='rounded-md outline-none p-2 px-4 border-2 w-full lg:w-1/3 '
                value={key}
                onChange={handleChange}
            />
        </form>
    </div>
  )
}


export default UserSearchBar