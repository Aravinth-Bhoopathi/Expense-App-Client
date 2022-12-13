import React from 'react'
import { useSelector } from 'react-redux';
import { Chart } from "react-google-charts";

const ExpenseChart = (props) => {

    const expenseList = useSelector((state) => {
        return state.expense.filter((ele) => {
            return !ele.category.isDeleted && !ele.isDeleted
        })
    })

    const categoryList = useSelector((state) => {
        return state.category.filter((ele) => {
            return !ele.isDeleted
        })
    })

    const categoryWiseExpense = categoryList.map((ele) => {
        return expenseList.filter((ele1) => {
            return ele1.category._id === ele._id
        })
    })

    const sourceData = []

    categoryWiseExpense.forEach((ele) => {
        if(ele.length > 0){
            const name = ele[0].category.name
            const amount = ele.reduce((pv, cv) => {
                return pv + cv.amount
            }, 0)
            const count = ele.length
            sourceData.push({name, amount, count})
        }
    })


    const data = [["Expense Name", "Amount"]]

    let countLength = 0

    const chartdata=sourceData.filter((ele,i)=>{
        countLength = i
        return i<5 && ele
    })

    chartdata.forEach((ele)=>{
        data.push([ele.name,ele.amount])
    })

    const options = {
        title : "Expense chart",
        is3D : true,
        backgroundColor : ''
    }

    return (
        <div>
            {countLength < 5 && 
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"110%"}
                height={"250px"}
                />
            }
        </div>
    )
}

export default ExpenseChart