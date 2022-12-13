import React from "react"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import '../../css/login.css'
import { startUserLogin } from "../../actions/userAction"

const UserLogin = (props) => {
    const {toggle} = props
    const formik = useFormik({
        initialValues : {
            email : '',
            password : ''
        },
        validationSchema : Yup.object({
            email : Yup.string().email().required(),
            password : Yup.string().min(8).required()
        }),
        onSubmit : function(values){
            const data = {email : values.email, password : values.password}
            const redirect = () => {
                toggle()
                props.history.push("/home")
            }
            startUserLogin(data, redirect)
        }
    })
    return (
        <div className='login'>
            <h2>Login</h2>
            <form onSubmit={formik.handleSubmit}>
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
                <input type="submit" value=" Login " className="btn btn-info"/>
            </form>
        </div>
    )
}

export default UserLogin

