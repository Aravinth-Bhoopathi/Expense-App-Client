const initialState = {}

const budgetReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LIST_BUDGET' : {
            return {...action.payload}
        }
        case 'UPDATE_BUDGET' : {
            return {...state, amount : action.payload.amount}
        }
        default : {
            return {...state}
        }
    }
}

export default budgetReducer