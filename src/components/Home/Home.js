import React, {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import ExpenseForm from "./ExpenseForm"
import ExpenseTable from "./ExpenseTable"
import {startListBudget} from "../../actions/budgetAction"
import {startListExpense} from '../../actions/expenseAction'
import { startListCategory } from "../../actions/categoryAction"
import ExpenseOverView from "./Expense/ExpenseOverview"
import ExpenseChart from "./Expense/ExpenseChart"
import CategoryWiseTable from "./Expense/CategoryWiseTable"
import { Modal } from 'antd';
import {Input} from 'antd'
import '../../css/chart.css'

function Home(props){
    const [toggle, setToggle] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [table, setTable] = useState('all')

    const dispatch= useDispatch()

    useEffect(() => {
        dispatch(startListBudget())
        dispatch(startListExpense())
        dispatch(startListCategory())
    }, [dispatch])

    const expenseList = useSelector((state) => {
        return state.expense
    })

    const budget = useSelector((state) => {
        return state.budget
    })

    const totalAmount = budget.amount 
    
    const totalExpense = expenseList.reduce((pv, cv) => {
        return cv.isDeleted ? pv : pv + cv.amount
    }, 0)
    
    const walletAmount = totalAmount - totalExpense
    
    const expenseSearch = expenseList.filter((ele) => {
        if(table === 'all'){
            return (
                ele.title.toLowerCase().includes(search.toLowerCase()) || ele.category.name.toLowerCase().includes(search.toLowerCase()) 
            )
        }
        if(table === 'delete'){
            return ele.isDeleted || ele.category.isDeleted
        }
        else{
            return !ele.isDeleted && !ele.category.isDeleted
        }
        
    })

    const handleModalCancel = () => {
        setIsModalOpen(false);
    };

    const handleClick = () => {
        setToggle(!toggle)
        setIsModalOpen(true)
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handelSelectChange = (e) => {
        setTable(e.target.value)
    }

    return (
        <div>
            <div className="row">
                <div className="col-5 mt-3 ms-5">
                    <ExpenseOverView />
                </div>

                <div className="col-5 mt-5 ms-5 chart">
                    <div>
                        <div>
                            <h4 className="text-primary">Visual Representations</h4><br/><br></br>
                            <CategoryWiseTable />
                        </div>
                        <div>
                            <ExpenseChart />
                        </div>
                    </div>
                </div>
            </div><hr/>

            <div className="row">
                <div className="col-4">
                    <button className="btn btn-success" disabled={walletAmount <= 0} onClick={handleClick}> ADD EXPENSE </button>
                </div>
                <div className="col-3 ms-auto ">
                    <Input type='search' placeholder="search" disabled={table !== 'all'} value={search} onChange={handleSearch}/>
                </div>
            </div>
            <br/>
            <div>
                <select onChange={handelSelectChange}>
                    <option value="all">All</option>
                    <option value="delete">Delete</option>
                    <option value="nonDelete">Non Delete</option>
                </select>
            </div>
            <div>
                <Modal title="Expense Form" open={isModalOpen} okButtonProps={{style:{display:'none'}}} onCancel={handleModalCancel}>
                    <ExpenseForm action="Add" handleModalCancel={handleModalCancel} walletAmount={walletAmount} />
                </Modal>
            </div>
            <ExpenseTable expenseSearch={expenseSearch} totalAmount={totalAmount} totalExpense={totalExpense} />
        </div>
    )
}

export default Home