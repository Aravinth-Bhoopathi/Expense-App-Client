import React, {useEffect} from "react"
import {useSelector, useDispatch} from 'react-redux'
import {startListBudget} from "../../actions/budgetAction"

function BudgetView(props){
    const dispatch = useDispatch()
    const budget = useSelector((state) => {
        return state.budget
    })

    const expenseAmount = useSelector((state) => {
        return state.expense
    })

    let TotalAmount = budget.amount 

    const TotalExpense = expenseAmount.reduce((pv, cv) => {
        return cv.isDeleted ? pv : pv + cv.amount
    }, 0)

    const walletAmount = TotalAmount - TotalExpense

    useEffect(() => {
        dispatch(startListBudget())
    }, [dispatch])

    return (
        <div>
            <p>Total Budget - Rs. {budget.amount}</p>
            <p>Total Expense - Rs. {TotalExpense}</p>
            <p>BalanceAmount - Rs. {walletAmount}</p>
        </div>
        
    )
}

export default BudgetView