import notebookService from "../../../services/notebookService";
import noteService from "../../../services/noteService";
import tabService from "../../../services/tabService"
import TreeModel from "tree-model-improved";

const noteReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_NOTES': {
      return action.data
    }
    case 'EDIT_TAB': {
      // const id = action.data.id
      // const editedTab = state.find(t => t.id === id)
      // const updatedTab = {...editedTab, title: action.data.title}

      // return state.map(t => t.id!==id ? t : updatedTab)
      return action.data
    }
    case 'NEW_TAB': {
      // const newTab = action.data
      // const tabTree = {...newTab, level: 0, isOpen: true, children: []}

      // return [...state, tabTree]
      return action.data
    }
    case 'DELETE_TAB': {
      return action.data
    }
    case 'EDIT_NOTE': {
      // const id = action.data.id
      // const anecdoteToVote = state.find(a => a.id === id)
      // const votedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }

      // return state.map(a => a.id !== id ? a : votedAnecdote )
      return action.data
    }
    case 'NEW_NOTE': {
      return action.data
    }
    case 'ADD_ROOT_NOTE': {
      //const tabData = state.find(t => t.id == action.tabId)
      //window.alert(JSON.stringify(state, null, 2))
     //window.alert(JSON.stringify(action, null, 2))

      const lol = {
        children: state
      }

      const root = new TreeModel().parse(lol);
      window.alert(JSON.stringify(root.model, null, 2))

      const tabNode = root.first((n) => {
        window.alert(JSON.stringify(n.model, null, 2))
        return n.model.id === action.tabId
      })

      const newNode = new TreeModel().parse(action.noteData)

      tabNode.addChild(newNode)

      window.alert(JSON.stringify(tabNode.model, null, 2))

      return [tabNode.model]
    }
    case 'DELETE_NOTE': {
      return action.data
    }
    default:
    return state
  } 
}

// export const initializeTabNotes = (tabId) => {
//   return async dispatch =>  {
//     // const tabIds = tabs.map(t => t.id)
//     const tabNotes = await notebookService.getTabNotes(tabId)
//     // const notes = tabIds.map(tabId => await notebookService.getTabNotes(tabId))
//     dispatch({
//       type: 'INIT_NOTES', 
//       data: tabNotes
//     })
//   } 
// }

const getAllTabNotes = async () => {
  const tabs = await tabService.getAllTabs()
    const tabIds = tabs.map(t => t.id)
    const notes = await Promise.all(tabIds.map(async (tabId) => {
      const tabNotes = await tabService.getTabNotes(tabId)
      return tabNotes
    }))
  
  return notes
}

export const initializeAllNotes = () => {
  return async dispatch =>  {
    const tabs = await tabService.getAllTabs()
    const tabIds = tabs.map(t => t.id)
    // console.log(tabIds)
    // const tabNotes = await notebookService.getTabNotes(tabId)
    const notes = await Promise.all(tabIds.map(async (tabId) => {
      const tabNotes = await tabService.getTabNotes(tabId)
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

export const editTab = (tabId, updatedTab) => {
  return async dispatch => {
    const editedTab = await tabService.editTab(tabId, updatedTab)
    console.log(editedTab)

    const tabs = await tabService.getAllTabs()
    const tabIds = tabs.map(t => t.id)
    const notes = await Promise.all(tabIds.map(async (tabId) => {
      const tabNotes = await tabService.getTabNotes(tabId)
      return tabNotes
    }))
    // const notes = getAllTabNotes()

    dispatch({
      type: 'EDIT_TAB',
      data: notes
    })
  }
}

export const addTab = (title, after) => {
  return async dispatch => {
    const newTab = await tabService.createNewTabAfter(title, after)
    console.log(newTab)

    // const tabs = await tabService.getAllTabs()
    // const tabIds = tabs.map(t => t.id)
    // const notes = await Promise.all(tabIds.map(async (tabId) => {
    //   const tabNotes = await tabService.getTabNotes(tabId)
    //   return tabNotes
    // }))
    const notes = await getAllTabNotes()

    dispatch({
      type: 'NEW_TAB',
      data: notes
    })
  }
}

export const deleteTab = (tabId) => {
  return async dispatch => {
    await notebookService.deleteTab(tabId)
    
    const notes = await getAllTabNotes()

    dispatch({
      type: 'DELETE_TAB', 
      data: notes
    })
  }
}


export const editNote = (noteId, updatedNote) => {
  return async dispatch =>  {
    const editedNote = await noteService.editNote(noteId, updatedNote)
    console.log(editedNote)
    // const tabId = editedNote.tabId
    // const updatedTabNotes = await notebookService.getTabNotes(tabId)

    const notes = await getAllTabNotes()

    dispatch({
      type: 'EDIT_NOTE', 
      data: notes
    })
  } 
}

export const addNote = (tabId, newNote) => {
  return async dispatch => {
    const newN = await noteService.createNewNote(tabId, newNote)
    console.log(newN)

    const notes = await getAllTabNotes()

    dispatch({
      type: 'NEW_NOTE',
      data: notes
    })
  }
}

export const addRootNote = (tabId, newNote) => {
  return async dispatch => {
    const newN = await noteService.createNewNote(tabId, newNote)
    console.log(newN)


    //const notes = await getAllTabNotes()

    dispatch({
      type: 'ADD_ROOT_NOTE',
      tabId,
      noteData: newNote
    })
  }
}

export const deleteNote = (noteId) => {
  return async dispatch => {
    await noteService.deleteNote(noteId)

    const notes = await getAllTabNotes()

    dispatch({
      type: 'DELETE_NOTE',
      data: notes
    })
  }
}

export default noteReducer