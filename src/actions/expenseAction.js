import axios from "axios";

export const startCreateExpense = (data, resetForm) => {
    return (dispatch) => {
        axios.post('http://localhost:3030/api/expense', data, {
            headers : {
                "authorization" : localStorage.getItem('token')
            }
        })
        .then((response) => {
            const result = response.data
            dispatch(createExpense(result))
            resetForm()
        })
        .catch((err) => {
            alert(err)
        })
    }
}

export const createExpense = (data) => {
    return {
        type : 'ADD_EXPENSE',
        payload : data
    }
}

export const startListExpense = () => {
    return (dispatch) => {
        axios.get('http://localhost:3030/api/expense', {
            headers : {
                "authorization" : localStorage.getItem('token')
            }
        })
        .then((response) => {
            const result =  response.data 
            dispatch(ListExpense(result))
        })
        .catch((err) => {
            alert(err)
        })
    }
}

export const ListExpense = (data) => {
    return {
        type : 'GET_EXPENSE',
        payload : data
    }
}

export const startUpdateExpense = (id, action, data=null) => {
    return (dispatch) => {
        axios.put(`http://localhost:3030/api/expense/${id}?action=${action}`, data, {
            headers : {
                'authorization' : localStorage.getItem('token')
            }
        })
        .then((response) => {
            const result = response.data 
            console.log(result)
            dispatch(UpdateExpense(result))
        })
        .catch((err) => {
            alert(err)
        })
    }
}

export const UpdateExpense = (data) => {
    return {
        type : 'UPDATE_EXPENSE',
        payload : data
    }
}


