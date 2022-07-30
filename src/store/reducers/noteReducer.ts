import notebookService from "../../../services/notebookService";
import noteService from "../../../services/noteService";
import tabService from "../../../services/tabService"
import {NoteAction, NotesState} from "../types";
import {ITab, ITreeNode} from "../../model";
import TreeModel from "tree-model-improved";
import {getTabNotes} from "../actions/getTabNotes";
import produce from "immer";

const initialState: NotesState = {
    data: {},
    currentRequestId: "", error: undefined, loading: undefined
}

const noteReducer = produce((state: NotesState = initialState, action: NoteAction) => {
    switch (action.type) {
        case 'SET_TAB_NOTES': {
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.tabId]: action.notes
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
                    [action.tabId]: [...rootNodes, action.note]
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
        case 'DELETE_NOTE': {
            const tabData = state.data[action.tabId]

            const index = tabData.findIndex(node => node.id === action.noteId)
            tabData.splice(index, 1)

            return state

            /*return {
                ...state,
                data: {
                    ...state.data,
                    [action.tabId]: rootNodes
                },
            }*/
        }
        default:
            return state
    }
})

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

/*            tabs.map(tab => {
                noteService.getTabNotes(tab.id).then(result => {
                        return dispatch({
                            type: 'SET_TAB_NOTES',
                            tabId: tab.id,
                            notes: result
                        })
                    }
                )
            })*/
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

export const createNote = (tabId, newNote) => {
    return async dispatch => {
        const newN = await noteService.createNewNote(tabId, newNote)
        console.log(newN)

/*        noteService.getTabNotes(tabId).then(tabTree => {
                return dispatch({
                    type: 'SET_TAB_NOTES',
                    tabId,
                    rootNodes: tabTree.children
                })
            }
        )*/
    }
}

export default noteReducer