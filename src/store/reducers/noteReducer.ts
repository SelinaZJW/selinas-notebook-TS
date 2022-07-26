import notebookService from "../../../services/notebookService";
import noteService from "../../../services/noteService";
import tabService from "../../../services/tabService"
import {NoteAction, NotesState} from "../types";
import {ITab, ITreeNode} from "../../model";
import TreeModel from "tree-model-improved";
import {getTabNotes} from "../actions/getTabNotes";

const initialState: NotesState = {
    data: {},
    currentRequestId: "", error: undefined, loading: undefined
}

const noteReducer = (state: NotesState = initialState, action: NoteAction) => {
    switch (action.type) {
        case 'SET_TAB_NOTES': {
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.tabId]: action.rootNodes
                },
            }
        }
        /*    case 'NEW_TAB': {
              // const newTab = action.data
              // const tabTree = {...newTab, level: 0, isOpen: true, children: []}

              // return [...state, tabTree]
              return action.data
            }*/
        /*    case 'DELETE_TAB': {
              return action.data
            }*/
        /*    case 'EDIT_NOTE': {
              // const id = action.data.id
              // const anecdoteToVote = state.find(a => a.id === id)
              // const votedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }

              // return state.map(a => a.id !== id ? a : votedAnecdote )
              return action.data
            }*/
        /*    case 'NEW_NOTE': {
              return action.data
            }*/
        case 'ADD_ROOT_NOTE': {
            const rootNodes = state.data[action.tabId]

            return {
                ...state,
                data: {
                    ...state.data,
                    [action.tabId]: [...rootNodes, action.rootNode]
                },
            }
        }
        case 'SET_NOTE': {
            console.log('SET_NOTE', action.tabId, action.noteData)

            const rootNodes: any[] = state.data[action.tabId]

            const treeModel = new TreeModel().parse({children: rootNodes})
            const node = treeModel.first((n) => n.model.id === action.noteData.id);

            node.model.title = action.noteData.title

            return {
                ...state,
                data: {
                    ...state.data,
                    [action.tabId]: rootNodes
                },
            }
        }
        /*    case 'ADD_ROOT_NOTE': {
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
            }*/
        /*    case 'DELETE_NOTE': {
              return action.data
            }*/
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

/*const getAllTabNotes = async () => {
    const tabs = await tabService.getAllTabs()
    const tabIds = tabs.map(t => t.id)
    const notes = await Promise.all(tabIds.map(async (tabId) => {
        const tabNotes = await tabService.getTabNotes(tabId)
        return tabNotes
    }))

    return notes
}*/

export const initializeAllNotes = () => {
    return async dispatch => {
        const tabsPromise: Promise<ITab[]> = tabService.getAllTabs()

        tabsPromise.then(tabs => {
            dispatch({
                type: 'INIT_TABS',
                tabs
            })

            tabs.map(tab => {
                tabService.getTabNotes(tab.id).then(tabTree => {
                        return dispatch({
                            type: 'SET_TAB_NOTES',
                            tabId: tab.id,
                            rootNodes: tabTree.children
                        })
                    }
                )
            })
        })


        // console.log(tabIds)
        // const tabNotes = await notebookService.getTabNotes(tabId)
        // const notes = await Promise.all(tabIds.map(async (tabId) => {
        //     const tabNotes = await tabService.getTabNotes(tabId)
            // console.log(tabNotes)
            // return tabNotes

            // dispatch({
            //     type: 'INIT_TAB_NOTES',
            //     tabId: tabId,
            //     data: notes
            // })
        // }))
        // console.log(notes)
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

export const addTab = (title, after?) => {
    return async dispatch => {
        const newTab = await tabService.createNewTabAfter(title, after)
        console.log(newTab)

        // const tabs = await tabService.getAllTabs()
        // const tabIds = tabs.map(t => t.id)
        // const notes = await Promise.all(tabIds.map(async (tabId) => {
        //   const tabNotes = await tabService.getTabNotes(tabId)
        //   return tabNotes
        // }))
        // const notes = await getAllTabNotes()

        /*dispatch({
            type: 'NEW_TAB',
            data: notes
        })*/
    }
}

export const deleteTab = (tabId) => {
    return async dispatch => {
        await notebookService.deleteTab(tabId)

        dispatch({
            type: 'DELETE_TAB',
            tabId
        })
    }
}




export const createNote = (tabId, newNote) => {
    return async dispatch => {
        const newN = await noteService.createNewNote(tabId, newNote)
        console.log(newN)

        tabService.getTabNotes(tabId).then(tabTree => {
                return dispatch({
                    type: 'SET_TAB_NOTES',
                    tabId,
                    rootNodes: tabTree.children
                })
            }
        )
    }
}



export const deleteNote = (noteId) => {
    return async dispatch => {
        await noteService.deleteNote(noteId)

        /*dispatch({
            type: 'DELETE_NOTE',
            data: notes
        })*/
    }
}

export default noteReducer