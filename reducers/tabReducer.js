import notebookService from "../services/notebookService";

const tabReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_TABS': {
      return action.data
    }
    // case 'EDIT_TAB': {
    //   const id = action.data.id
    //   const anecdoteToVote = state.find(a => a.id === id)
    //   const votedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }

    //   return state.map(a => a.id !== id ? a : votedAnecdote )
    // }
    case 'NEW_TAB': {
      return [...state, action.data]
    }
    default:
    return state
  } 
}

export const initializeTabs = () => {
  return async dispatch =>  {
    const tabs = await notebookService.getAllTabs()
    dispatch({
      type: 'INIT_TABS', 
      data: tabs
    })
  } 
}



export default tabReducer