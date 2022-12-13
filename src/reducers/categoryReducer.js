const initialState = []

const categoryReducer = (state=initialState, action) => {
    switch(action.type){
        case 'ADD_CATEGORY' : {
            return [...state, {...action.payload}]
        }
        case 'GET_CATEGORY' : {
            return [...action.payload]
        }
        case 'UPDATE_CATEGORY' : {
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

export default categoryReducer