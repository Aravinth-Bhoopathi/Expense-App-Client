import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { startCreateCategory, startListCategory, startUpdateCategory } from '../../actions/categoryAction'

const CategoryForm = (props) => {
    const {name, action, _id, handleEditChange} = props

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startListCategory())
    }, [dispatch])
    
    const formik = useFormik({
        initialValues : {
            name : name || ''
        },
        validationSchema : Yup.object({
            name : Yup.string().required()
        }),
        onSubmit : function(values, {resetForm}){
            const data = {name : values.name}
            if(action === 'Add'){
                dispatch(startCreateCategory(data, resetForm))
            } else if(action === 'update'){
                console.log('update')
                dispatch(startUpdateCategory(_id, action, data))
                handleEditChange()
            }
            
        }
    })
    const handleCancel = () => {
        handleEditChange()
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label className='fw-semibold'> Category </label><br/>
                <input type="text" 
                    value={formik.values.name}
                    name="name"
                    onChange={formik.handleChange}
                    placeholder="category name here"
                /><br/>
                {formik.touched.name && formik.errors.name &&<span>{formik.errors.name}</span>}
                <br/>
                <input type="submit" value={action} className="btn btn-success btn btn-sm" />
                {action === 'update' && <button className="btn btn-secondary btn-sm" onClick={handleCancel}>cancel</button>}
            </form>
        </div>
    )
}

export default CategoryForm