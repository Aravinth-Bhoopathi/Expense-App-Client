import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { startGetUser, startUpdateProfile } from '../../actions/userAction'
import '../../css/profile.css'
import {Input} from 'antd'

const UserProfile = (props) => {
    const [image, setImage] = useState('')

    const dispatch = useDispatch()

    const user = useSelector((state) => {
        return state.user
    })

    useEffect(() => {
        dispatch(startGetUser())
    }, [dispatch])

    const handleImage=(e)=>{
        setImage(e.target.files[0])
    }

    const toggle = () => {
        setImage('')
    }

    const handleClick=()=>{
        const formdata = new FormData()
        formdata.append('image', image)
        dispatch(startUpdateProfile(formdata, toggle))
    }

    return (
        <div className='profile'>
            {
                Object.keys(user).length > 0 && (
                    <div><br/>
                        <h2 className="text-info">User Profile</h2><br/>
                        <p className='fw-semibold'>Name : {user.profile.name}</p>
                        <p className='fw-semibold'>Email : {user.email}</p>
                        <p className='fw-semibold'>Gender : {user.profile.gender}</p>
                        <p className='fw-semibold'>Occupation : {user.profile.occupation}</p>
                        <p className='fw-semibold'>CreatedAt : {user.createdAt.slice(0,10).split('-').reverse().join('-')}</p>
                        <p className='fw-semibold'>Time : {user.createdAt.slice(11,19)}</p>

                        <Input className="input" type="file" onChange={handleImage} /> 
                        <button className="btn btn-primary" onClick={handleClick} disabled={!image}>Upload</button>

                        <img src={`http://localhost:3030/${user.picture}`} alt='No data' width='150px' style={{position:'absolute',right:500,top:195}}/>
                    </div>
                )
            }
        </div>
    )
}

export default UserProfile