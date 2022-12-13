import React, { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import {startListBudget} from "../../actions/budgetAction" 
import { startListExpense } from "../../actions/expenseAction"
import { startListCategory } from "../../actions/categoryAction"
import { startGetUser } from '../../actions/userAction'
import Calculation from "./Calculation"
import {Table} from 'antd'
import { useReactToPrint } from 'react-to-print'
import swal from "sweetalert"

const Print = (props) => {
    const dispatch = useDispatch()

    const budget = useSelector((state) => {
        return state.budget
    })

    const expenseList=useSelector((state)=>{
        return state.expense.filter((ele)=>{
            return !ele.isDeleted && !ele.category.isDeleted
        })
    })

    const user = useSelector((state) => {
        return state.user
    })

    const TotalBudget = budget.amount

    const TotalExpense = expenseList.reduce((pv, cv) => {
        return pv + cv.amount
    }, 0)

    useEffect(() => {
        dispatch(startListBudget())
        dispatch(startListExpense())
        dispatch(startListCategory())
        dispatch(startGetUser())
    }, [dispatch])

    const dataSource = expenseList.map((ele, i) => {
        return {
            key : i + 1,
            categoryName : ele.category.name,
            expenseName : ele.title,
            expenseAmount : ele.amount
        }
    })

    const columns = [
        {
            title: 'SI No.',
            dataIndex: 'key'
        },
        {
            title : 'Category Name',
            dataIndex: 'categoryName'
        },
        {
            title : 'Expense Name',
            dataIndex: 'expenseName'
        },
        {
            title : 'Expense Amount',
            dataIndex: 'expenseAmount'
        }
    ]

    const  componentRef=useRef();

    const handlePrint = useReactToPrint({
        content : ()=> componentRef.current,
        documentTitle:'table',
        onAfterPrint:()=> swal('success')
    })

    return (
        <div>
            <div>
                <button onClick={handlePrint} className="btn btn-outline-secondary">print</button>
            </div>
            <div ref={componentRef}>
                {
                    Object.keys(user).length > 0 && (
                        <div className="text-center"><br/>
                            <p className='fw-semibold'>Name : {user.profile.name}</p>
                            <p className='fw-semibold'>Email : {user.email}</p>
                            <p className='fw-semibold'>Gender : {user.profile.gender}</p>
                            <p className='fw-semibold'>Occupation : {user.profile.occupation}</p>
                            <p className='fw-semibold'>CreatedAt : {user.createdAt.slice(0,10).split('-').reverse().join('-')}</p>
                        </div>
                    )
                }
                <Table  columns={columns}
                        dataSource={dataSource}
                        pagination={false}
                    >
                </Table>
                <Calculation TotalBudget={TotalBudget} TotalExpense={TotalExpense} />
            </div>
        </div>
    )
}

export default Print