import React from "react"
import { useSelector } from "react-redux"
import { Table } from "antd";

const CategoryWiseTable = (props) => {

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

    let countLength = 0

    const dataSource = sourceData.map((ele, i) => {
        countLength = i
        return {
            key : i,
            categoryName : ele.name,
            expenseCount : ele.count,
            expenseAmount : ele.amount
        }
    })

    const columns = [
        {
            title : 'Category',
            dataIndex : 'categoryName'
        },
        {
            title : 'Expense Count',
            dataIndex : 'expenseCount'
        },
        {
            title : 'Amount',
            dataIndex : 'expenseAmount'
        }
    ]

    return (
        <div>
            {countLength >= 5 && 
            <Table  
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{pageSize: 4}}
                    size= 'small'
                >
            </Table>
            }
        </div>
    )


}

export default CategoryWiseTable