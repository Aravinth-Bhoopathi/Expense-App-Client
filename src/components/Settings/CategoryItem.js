import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CategoryForm from './CategoryForm'
import { startListCategory, startUpdateCategory } from '../../actions/categoryAction'


const CategoryItem = (props) => {
    const [categoryData, setCategoryData] = useState({})
    const [toggleEdit, setToggleEdit] = useState(false)

    const dispatch = useDispatch()

    const category = useSelector((state) => {
        return state.category
    })

    useEffect(() => {
        dispatch(startListCategory())
    }, [dispatch])

    const handleRestoreChange = (id) => {
        const action = 'restore'
        dispatch(startUpdateCategory(id, action))
    }

    const handleDeleteChange = (id) => {
        const action = 'delete'
        dispatch(startUpdateCategory(id, action))
    }

    const handleEditChange = (data) => {
        setCategoryData(data)
        setToggleEdit(!toggleEdit)
    }

    return (
        <div>
            {toggleEdit && <CategoryForm {...categoryData} handleEditChange={handleEditChange} action="update" />}
            <h4 className="text-primary">Category List</h4><br/>
            <table>
                <tbody>
                    {
                        category.map((ele) =>{
                            if(ele.isDeleted === true){
                                return (
                                    <tr key={ele._id}>
                                        <td><del>{ele.name}</del></td>
                                        <td><del><button className="btn btn-outline-light btn-sm">Edit</button></del></td>
                                        <td><button className="btn btn-outline-primary btn-sm" onClick={() => {
                                            handleRestoreChange(ele._id)
                                        }}>Restore</button></td>
                                    </tr>
                                )
                            } else {
                                return (
                                    <tr key={ele._id}>
                                        <td>{ele.name}</td>
                                        <td><button className="btn btn-outline-secondary btn-sm" onClick={() => {
                                            handleEditChange(ele)
                                        }}>Edit</button></td>
                                        <td><button className="btn btn-danger btn-sm" onClick={() => {
                                            handleDeleteChange(ele._id)
                                        }}>Delete</button></td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default CategoryItem