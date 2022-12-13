const initialState = []

const expenseReducer = (state=initialState, action) => {
    switch(action.type){
        case "ADD_EXPENSE" : {
            return [...state, {...action.payload}]
        }
        case "GET_EXPENSE" : {
            return [...action.payload]
        }
        case "UPDATE_EXPENSE" : {
            return state.map((ele) => {
                if(ele._id === action.payload._id){
                    return {...ele, ...action.payload}
                } else {
                    return {...ele}
                }
            })
        }
        default : {
            return [...state]
        }
    }
}

export default expenseReducer