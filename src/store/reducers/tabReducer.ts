import notebookService from "../../../services/notebookService";
import {TabAction, TabsState} from "../types";

const initialState: TabsState = {
  data: {},
  currentRequestId: "", error: undefined, loading: undefined
}

const tabReducer = (state: TabsState = initialState, action: TabAction) => {
  switch(action.type) {
    case 'INIT_TABS': {
      const newTabs = {}

      action.tabs.forEach(tab => {
        newTabs[tab.id] = tab
      })

      return {
        ...state,
        data: newTabs
      }
    }
    // case 'EDIT_TAB': {
    //   const id = action.data.id
    //   const anecdoteToVote = state.find(a => a.id === id)
    //   const votedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }

    //   return state.map(a => a.id !== id ? a : votedAnecdote )
    // }
    case 'SET_TAB': {
      return {
        ...state,
        [action.tab.id]: action.tab
      }
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