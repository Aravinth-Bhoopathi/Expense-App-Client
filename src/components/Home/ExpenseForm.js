import React, {useEffect} from "react"
import { useFormik } from "formik"
import * as Yup from 'yup'
import {useSelector, useDispatch} from 'react-redux'
import {startListCategory} from '../../actions/categoryAction'
import { startCreateExpense, startUpdateExpense } from "../../actions/expenseAction"
import swal from "sweetalert"
import '../../css/expense.css'

const ExpenseForm = (props) => {
    const {title, amount, expenseDate, action, _id, handleEditChange, handleModalCancel, walletAmount} = props

    const dispatch = useDispatch()

    const category = useSelector((state) => {
        return state.category.filter((ele) => {
            return !ele.isDeleted
        })
    })

    useEffect(() => {
        dispatch(startListCategory())
    }, [dispatch])

    const formik = useFormik({
        initialValues : {
            title : title || '',
            amount : amount || '',
            expenseDate : (expenseDate && expenseDate.slice(0,10))|| '',
            category : ''
        },
        validationSchema : Yup.object({
            title : Yup.string().required(),
            amount : Yup.number().required().typeError('Amount must be in number'),
            expenseDate : Yup.date().required(),
            category : Yup.string().required()
        }),
        onSubmit : function(values, {resetForm}) {
            const data = {title : values.title, amount : Number(values.amount), expenseDate : values.expenseDate, category : values.category}
            if(action === 'Add'){
                if(data.amount <= walletAmount){
                    dispatch(startCreateExpense(data, resetForm))
                    handleModalCancel()
                } else {
                    swal({
                        title: "Budget is low!",
                        text: "Update a budget!",
                        icon: "warning",
                      });
                }
            } else if(action === 'update'){
                dispatch(startUpdateExpense(_id, action, data))
                handleEditChange()
            }
        }
    })

    const handleCancel = () => {
        handleEditChange()
    }

    return (
        <div className="expense">
            <form onSubmit={formik.handleSubmit}>
                <br/>
                <select name="category" onChange={formik.handleChange}>
                <option> select categories </option>
                {
                    category.map((ele) => {
                        return <option key={ele._id} value={ele._id}>{ele.name}</option>
                    })
                }
                </select><br/>
                {formik.touched.category && formik.errors.category && <span>{formik.errors.category}</span>}
                <br/>
                <input type="text" 
                    value={formik.values.title}
                    name="title"
                    onChange={formik.handleChange}
                    placeholder="Enter a Title"
                /><br/>
                {formik.touched.title && formik.errors.title &&<span>{formik.errors.title}</span>}
                <br/>
                <input type="text" 
                    value={formik.values.amount}
                    name="amount"
                    onChange={formik.handleChange}
                    placeholder="Enter a Amount"
                /><br/>
                {formik.touched.amount && formik.errors.amount &&<span>{formik.errors.amount}</span>}
                <br/>
                <input type="date" 
                    value={formik.values.expenseDate}
                    name="expenseDate"
                    onChange={formik.handleChange}
                /><br/>
                {formik.touched.expenseDate && formik.errors.expenseDate &&<span>{formik.errors.expenseDate}</span>}
                <br/><br/>
                <input type="submit" value={action} className="btn btn-success btn btn-sm" />
                {action === 'update' && <button className="btn btn-secondary btn-sm" onClick={handleCancel}>cancel</button>}
            </form>
        </div>
    )
}

export default ExpenseForm