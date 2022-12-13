import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {startUpdateExpense} from '../../actions/expenseAction'
import { Table, Popconfirm, Form, Button, Input} from "antd";

const ExpenseList = (props) => {
    const {expenseSearch} = props
    const [editRow, setEditRow] = useState('')
    const [toggleEdit, setToggleEdit] = useState(false)
    const [categoryId, setCategoryId] = useState('')

    const [form] = Form.useForm()

    const dispatch = useDispatch()

    const category = useSelector((state) => {
        return state.category.filter((ele) => {
            return !ele.isDeleted
        })
    })

    const toggleSet = () => {
        setToggleEdit(!toggleEdit)
    }

    const dataSource = expenseSearch.map((ele) => {
        return {
            key : ele._id, 
            categoryName : ele.category.name,
            expenseName : ele.title,
            expenseAmount : ele.amount,
            expenseDate : ele.expenseDate.slice(0,10).split('-').reverse().join('-'),
            isDeleted : ele.isDeleted,
            categoryDeleted : ele.category.isDeleted
        }
    })
        
    const handleDeleteRow = (record) => {
        const id = record.key
        const action = 'delete'
        dispatch(startUpdateExpense(id, action))
    }

    const handleRestoreRow = (record) => {
        const id = record.key
        const action = 'restore'
        dispatch(startUpdateExpense(id, action))
    }

    const handleEditRow = (record) => {
        setEditRow(record.key)
        toggleSet()
        form.setFieldsValue({
            categoryName : record.categoryName,
            expenseName : record.expenseName,
            expenseAmount : record.expenseAmount,
            expenseDate : record.expenseDate.slice(0,10).split('-').reverse().join('-')
        })
    }

    const handleCategory = (e) => {
        setCategoryId(e.target.value)
    }

    const columns = [
        {
            title : 'Category Name',
            dataIndex:'categoryName',
            render:(text, record) => {
                if(editRow === record.key && toggleEdit){
                    return (
                        <Form.Item 
                            name='categoryName'
                            rules={[{
                                required: true,
                                message:'please select category!'
                            }]}
                        >
                            <select onChange={handleCategory}>
                                <option>select category</option>
                                {category.map((ele) => {
                                    return <option key={ele._id} value={ele._id}>{ele.name}</option>
                                })}
                            </select>
                        </Form.Item>
                    )
                }
                else if(record.isDeleted || record.categoryDeleted){
                    return <s>{record.categoryName}</s>
                } else {
                    return <p>{text}</p>
                }
            }
        },
        {
            title: 'Expense Name',
            dataIndex: 'expenseName',
            render:(text, record) => {
                if(editRow === record.key && toggleEdit){
                    return (
                        <Form.Item
                            name= 'expenseName'
                            rules= {[{
                                required  : true,
                                message : 'please select expense name!'
                            }]} >
                            <Input />
                        </Form.Item>
                    )
                }
                else if(record.isDeleted || record.categoryDeleted){
                    return <s>{record.expenseName}</s>
                } else {
                    return <p>{text}</p>
                }
            }
        },
        {
            title: 'Expense Amount',
            dataIndex: 'expenseAmount',
            render:(text, record) => {
                if(editRow === record.key && toggleEdit){
                    return (
                        <Form.Item 
                            name = 'expenseAmount'
                            rules = {[{
                                required : true,
                                message : 'please select expense amount!'
                            }]}
                            >
                            <Input />
                        </Form.Item>
                    )
                }
                else if(record.isDeleted || record.categoryDeleted){
                    return <s>{record.expenseAmount}</s>
                } else {
                    return <p>{text}</p>
                }
            }
            
        },
        {
            title: 'Expense Date',
            dataIndex: 'expenseDate',
            render:(text, record) => {
                if(editRow === record.key && toggleEdit){
                    return (
                        <Form.Item
                            name = 'expenseDate' 
                            rules = {[{
                                required : true,
                                message : 'please select expense date'
                            }]}
                            >
                            <Input />
                        </Form.Item>
                    )
                }
                else if(record.isDeleted || record.categoryDeleted){
                    return <s>{record.expenseDate}</s>
                } else {
                    return <p>{text}</p>
                }
            }
        },
        {
            title: 'Operation',
            dataIndex: 'edit',
            render: (_, record) => {
                return (
                    <>
                        {!toggleEdit &&
                        <Popconfirm title="Sure to Edit?" disabled={record.isDeleted || record.categoryDeleted} onConfirm={() => handleEditRow(record)}>
                        <Button disabled={record.isDeleted || record.categoryDeleted}  type="dashed" >Edit</Button>
                        </Popconfirm> }
                        {toggleEdit && editRow === record.key &&
                        <>
                            <Button htmlType='submit'>save</Button>
                            <Button type='link primary' onClick={toggleSet}>cancel</Button>
                        </>
                        }
                    </>
                )
            }
        },
        {
            title: 'Action',
            render: (_, record) => {
                return (
                    <Popconfirm title="Sure to Delete?" disabled={record.isDeleted || record.categoryDeleted} onConfirm={() => handleDeleteRow(record)}>
                            <Button disabled={record.isDeleted || record.categoryDeleted} type='primary' danger>Delete</Button>
                    </Popconfirm>
                )
            }
        },
        {
            title: 'Action',
            dataIndex: 'edit',
            render: (_, record) => {
                return (
                    <Popconfirm title="Sure to Restore?" disabled={!record.isDeleted || record.categoryDeleted} onConfirm={() => handleRestoreRow(record)}>
                    <Button disabled={!record.isDeleted || record.categoryDeleted} type='dashed' danger>Restore</Button>
                    </Popconfirm>
                )
            }
        },
        // {
        //     tilte: 'Action',
        //     render: (_, record) => {
        //         if(!record.isDeleted && deleteRow !== record.key){
        //             return (
        //                 <Popconfirm title="Sure to Delete?" onConfirm={() => handleDeleteRow(record)}>
        //                      <Button disabled={record.isDeleted} type='primary' danger>Delete</Button>
        //                 </Popconfirm>
        //             )
        //         } 
        //         else if(record.isDeleted && deleteRow !== record.key) {
        //             return (
        //                 <Popconfirm title="Sure to Restore?" onConfirm={() => handleRestoreRow(record)}>
        //                     <Button>Restore</Button>
        //                 </Popconfirm>
        //             )
        //         }
        //     }
        // },
        
    ]

    const onFinish = (values) => {
        const id = editRow
        const action = 'update'
        const data = {
            title : values.expenseName,
            amount : Number(values.expenseAmount),
            expenseDate : values.expenseDate.split('-').reverse().join('-'),
            category : categoryId
        }
        dispatch(startUpdateExpense(id, action , data))
        toggleSet()
        setEditRow('')
        setCategoryId('')
    }


    return (
        <div>
            <Form form={form} onFinish={onFinish}>
                <Table  columns={columns}
                    dataSource={dataSource}
                    pagination={{pageSize: 4}}
                >
                </Table>
            </Form>
        </div>
    )
}

export default ExpenseList