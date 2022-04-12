import exp from "constants";
import notebookService from "../services/notebookService";

const noteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'INIT_NOTES': {
      return action.data
    }
    case 'EDIT_NOTE_TITLE': {
      // const id = action.data.id
      // const anecdoteToVote = state.find(a => a.id === id)
      // const votedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }

      // return state.map(a => a.id !== id ? a : votedAnecdote )
      return action.data
    }
    case 'EDIT_NOTE_PARENT': {
      return action.data
    }
    case 'NEW_NOTE': {
      return [...state, action.data]
    }
    default:
    return state
  } 
}

export const initializeNotes = (tabId) => {
  return async dispatch =>  {
    const tabNotes = await notebookService.getTabNotes(tabId)
    dispatch({
      type: 'INIT_NOTES', 
      data: tabNotes
    })
  } 
}

export const editNoteTitle = (title, noteId) => {
  return async dispatch =>  {
    const editedNote = await notebookService.editNoteTitle(title, noteId)
    const tabId = editedNote.tabId
    const updatedTabNotes = await notebookService.getTabNotes(tabId)
    dispatch({
      type: 'INIT_NOTES', 
      data: updatedTabNotes
    })
  } 
}

export const editNoteParent = (parentId, noteId) => {
  return async dispatch =>  {
    const editedNote = await notebookService.editNoteTitle(parentId, noteId)
    const tabId = editedNote.tabId
    const updatedTabNotes = await notebookService.getTabNotes(tabId)
    dispatch({
      type: 'INIT_NOTES', 
      data: updatedTabNotes
    })
  } 
}


export default noteReducer