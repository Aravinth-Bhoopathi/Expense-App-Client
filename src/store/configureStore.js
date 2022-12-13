import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'
import budgetReducer from '../reducers/budgetReducer'
import categoryReducer from '../reducers/categoryReducer'
import expenseReducer from '../reducers/expenseReducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        user : userReducer,
        budget : budgetReducer,
        category : categoryReducer,
        expense : expenseReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureStore