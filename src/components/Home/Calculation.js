import React from "react"
import {Table} from 'antd'

const Calculation = (props) => {
    const {TotalBudget, TotalExpense} = props

    const dataSource = [
        {
           key : 1,
           particulars : 'Total Budget',
           amount : TotalBudget
        },
        {
            key : 2,
            particulars : 'Total Expense',
            amount : TotalExpense
        },
        {
            key : 3,
            particulars : 'Wallet Amount',
            amount : TotalBudget - TotalExpense
        }
    ]

    const columns = [
        {
            title : 'SI No.',
            dataIndex : 'key'
        },
        {
            title : 'Particulars',
            dataIndex : 'particulars'
        },
        {
            title : 'Amount',
            dataIndex : 'amount'
        }
    ]


    return (
        <div>
            <Table  columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                    >
            </Table>
        </div>
    )
}

export default Calculation