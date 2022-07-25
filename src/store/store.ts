import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import tabReducer from './reducers/tabReducer'
import noteReducer from './reducers/noteReducer'

const reducer = combineReducers({ tabs: tabReducer, notes: noteReducer })
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch