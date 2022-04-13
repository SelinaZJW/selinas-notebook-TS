import notebookService from "../services/notebookService";

const noteReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_NOTES': {
      return action.data
    }
    case 'EDIT_NOTE_TITLE': {
      // const id = action.data.id
      // const anecdoteToVote = state.find(a => a.id === id)
      // const votedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }

      // return state.map(a => a.id !== id ? a : votedAnecdote )
      return [action.data]
    }
    case 'EDIT_NOTE_PARENT': {
      return action.data
    }
    case 'EDIT_NOTE_INDEX': {
      return action.data
    }
    case 'NEW_NOTE': {
      return [...state, action.data]
    }
    default:
    return state
  } 
}

export const initializeTabNotes = (tabId) => {
  return async dispatch =>  {
    // const tabIds = tabs.map(t => t.id)
    const tabNotes = await notebookService.getTabNotes(tabId)
    // const notes = tabIds.map(tabId => await notebookService.getTabNotes(tabId))
    dispatch({
      type: 'INIT_NOTES', 
      data: tabNotes
    })
  } 
}

export const initializeAllNotes = () => {
  return async dispatch =>  {
    const tabs = await notebookService.getAllTabs()
    const tabIds = tabs.map(t => t.id)
    // console.log(tabIds)
    // const tabNotes = await notebookService.getTabNotes(tabId)
    const notes = await Promise.all(tabIds.map(async (tabId) => {
      const tabNotes = await notebookService.getTabNotes(tabId)
      // console.log(tabNotes)
      return tabNotes
    }))
    // console.log(notes)

    dispatch({
      type: 'INIT_NOTES', 
      data: notes
    })
  } 
}

export const editNoteTitle = (title, noteId) => {
  return async dispatch =>  {
    const editedNote = await notebookService.editNoteTitle(title, noteId)
    const tabId = editedNote.tabId
    const updatedTabNotes = await notebookService.getTabNotes(tabId)
    dispatch({
      type: 'EDIT_NOTE_TITLE', 
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
      type: 'EDIT_NOTE_PARENT', 
      data: updatedTabNotes
    })
  } 
}


export default noteReducer