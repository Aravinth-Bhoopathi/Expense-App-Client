import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import swal from 'sweetalert'
import {startListBudget, startUpdateBudget} from "../../actions/budgetAction"
import { startListExpense } from '../../actions/expenseAction'

const Budget = (props) => {
    const dispatch = useDispatch()

    const budget = useSelector((state) => {
        return state.budget
    })

    const expense = useSelector((state) => {
        return state.expense
    })

    const expenseAmount = expense.reduce((pv, cv) => {
        return !cv.isDeleted ? pv + cv.amount : pv
    }, 0)

    useEffect(() => {
        dispatch(startListBudget())
        dispatch(startListExpense())
    }, [dispatch])

    const formik = useFormik({
        initialValues : {
            amount : ''
        },
        validationSchema : Yup.object({
            amount : Yup.number().required().typeError('Amount must be in number')
        }),
        onSubmit : function(values, {resetForm}){
            const data = {amount : Number(values.amount)}
            if(data.amount >= expenseAmount){
                dispatch(startUpdateBudget(data, resetForm))
            } else {
                swal({title : "Budget is less then Expense Amount", icon: "warning"})
            }
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label className='fw-semibold'> Total Budget </label><br/>
                <input type="text" 
                        value={formik.values.amount} 
                        name="amount" 
                        onChange={formik.handleChange}
                        placeholder={budget.amount}
                    /><br/>
                {formik.touched.amount && formik.errors.amount &&<span>{formik.errors.amount}</span>}
                <br/>
                <input type="submit" className='btn btn-info btn-sm' value=" update " />
            </form>
        </div>
    )
}

export default Budget