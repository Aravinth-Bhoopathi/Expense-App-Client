import React from "react"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import '../../css/register.css'
import { startUserRegister } from "../../actions/userAction"


const UserRegister = (props) => {

    const formik = useFormik({
        initialValues : {
            name : '',
            email : '',
            password : '',
            occupation : ''
        },
        validationSchema : Yup.object({
            name : Yup.string().required(),
            email : Yup.string().email().required(),
            password : Yup.string().min(8).required(),
            occupation : Yup.string()
        }),
        onSubmit : function(values){
            const data = {email : values.email , password : values.password, profile : {name : values.name, occupation : values.occupation} }
            const redirect = () => {
                props.history.push("/user/login")
            }
            startUserRegister(data, redirect)
        }
    })

    return (
        <div className='register'>
            <h2>Register</h2>
            <form onSubmit={formik.handleSubmit}>
                <input type="text" 
                    value={formik.values.name} 
                    name="name" 
                    onChange={formik.handleChange}
                    placeholder="enter your name"
                /><br/>
                {formik.touched.name && formik.errors.name &&<span>{formik.errors.name}</span>}
                <br/>
                <input type="email" 
                    value={formik.values.email} 
                    name="email" 
                    onChange={formik.handleChange}
                    placeholder="enter your email"
                /><br/>
                {formik.touched.email && formik.errors.email &&<span>{formik.errors.email}</span>}
                <br/>
                <input type="password" 
                    value={formik.values.password} 
                    name="password" 
                    onChange={formik.handleChange}
                    placeholder="enter your password"
                /><br/>
                {formik.touched.password && formik.errors.password &&<span>{formik.errors.password}</span>}
                <br/>
                <input type="text" 
                    value={formik.values.occupation} 
                    name="occupation" 
                    onChange={formik.handleChange}
                    placeholder="enter your occupation"
                /><br/>
                {formik.touched.occupation && formik.errors.occupation &&<span>{formik.errors.occupation}</span>}
                <br/>
                <input type="submit" value=" Register " className="btn btn-info"/>
            </form>
        </div>
    )
}

export default UserRegister