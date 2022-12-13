import React from 'react'
import Budget from './Budget'
import CategoryForm from './CategoryForm'
import CategoryItem from './CategoryItem'
import '../../css/setting.css'

const Setting = (props) => {
    return (
        <div className='row' style={{marginTop: '50px'}}>
            <div className='setting col-3 ms-auto'>
            <br/>
            <Budget /><br />
            <CategoryForm action="Add" /> <br/>
        </div>
        <div className='col-5 ms-auto'>
            <CategoryItem />
        </div>
        </div>
    )
}

export default Setting

