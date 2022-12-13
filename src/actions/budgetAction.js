import axios from 'axios'
import swal from 'sweetalert'

export const startListBudget = () => {
    return(dispatch) => {
        axios.get('http://localhost:3030/api/budget/list', {
        headers : {
            'authorization' : localStorage.getItem('token')
        }
    })
    .then((response) => {
        const result = response.data
        dispatch(listBudget(result))
    })
    .catch((err) => {
        swal(err)
    })
    }
}

export const listBudget = (data) => {
    return {
        type : "LIST_BUDGET",
        payload : data
    }
}

export const startUpdateBudget = (data, resetForm) => {
    return (dispatch) => {
        axios.put('http://localhost:3030/api/budget/update', data, {
            headers : {
                "authorization" : localStorage.getItem('token')
            }
        })
        .then((response) => {
            const result = response.data
            dispatch(updateBudget(result))
            resetForm()
        })
        .catch((err) => {
            alert(err)
        })
    }
}

export const updateBudget = (data) => {
    return {
        type : "UPDATE_BUDGET",
        payload : data
    }
}
