import React from "react"
import { useSelector } from "react-redux"
import { Progress } from 'antd';
import '../../../css/overview.css'

const ExpenseOverView = (props) => {

    const budget = useSelector((state) => {
        return state.budget
    })

    const expenseAmount = useSelector((state) => {
        return state.expense.filter((ele) => {
            return !ele.category.isDeleted && !ele.isDeleted
        })
    })

    let TotalAmount = budget.amount 

    const TotalExpense = expenseAmount.reduce((pv, cv) => {
        return cv.isDeleted ? pv : pv + cv.amount
    }, 0)
    
    let percentage = Math.round((TotalExpense/TotalAmount) * 100)

    const walletAmount = TotalAmount - TotalExpense

    return (
        <div className="overview">
            <h4 className="text-primary"> Expense Budget Overview</h4>
            <div className="mx-auto">
                <h6 className="text-info">Expense Budget</h6>
                <Progress type="circle" percent={percentage}  strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} width={160}  />
            </div><br/>
            <div style={{width: 300}} className="mx-auto">
                <h6 className="text-info">Remaining Budget</h6>
                <Progress percent={100 - percentage} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} />
            </div>
            <div>
                <p className='fw-semibold'>Total Budget - Rs. {budget.amount}</p>
                <p className='fw-semibold'>Total Expense - Rs. {TotalExpense}</p>
                <p className='fw-semibold'>Balance Amount - Rs. {walletAmount}</p>
            </div>
        </div>
    )
}

export default ExpenseOverView