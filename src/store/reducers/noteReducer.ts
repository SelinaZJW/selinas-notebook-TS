import tabService from "../../../services/tabService"
import {NoteAction, NotesState} from "../types";
import {ITab} from "../../model";
import produce from "immer";

const initialState: NotesState = {
    data: {},
    childIds: {},
    currentRequestId: "", error: undefined, loading: undefined
}

const unique = (value, index, self) => {
    return self.indexOf(value) === index
}

const noteReducer = produce((state: NotesState = initialState, action: NoteAction) => {
    switch (action.type) {
        case 'SET_TAB_NOTES': {
            // window.alert(`SET_TAB_NOTES`)
            /*return {
                ...state,
                data: {
                    ...state.data,
                    [action.tabId]: action.notes
                },
            }*/

            const parentIds = action.notes.map(note => note.parentId).filter(unique)

            state.data[action.tabId] = action.notes.map(note => ({
                id: note.id,
                parentId: note.parentId,
                title: note.title
            }))

            parentIds.forEach(parentId => {
                const childIds = action.notes.filter(note => note.parentId == parentId).map(note => note.id)
                const pId = parentId || action.tabId

                state.childIds[pId] = childIds
            })

            return state;
        }
        case 'ADD_ROOT_NOTE': {
            // const rootNodes = state.data[action.tabId]

            state.data[action.tabId].push(action.note)

            /*return {
                ...state,
                data: {
                    ...state.data,
                    [action.tabId]: [...rootNodes, action.note]
                },
            }*/

            return state;
        }
        case 'SET_NOTE': {
            // console.log('SET_NOTE', action.tabId, action.noteData)
            // window.alert(`SET_NOTE ${action.tabId} ${JSON.stringify(action.noteData, null, 2)}`)

            /*            const rootNodes: any[] = state.data[action.tabId]

                        const treeModel = new TreeModel().parse({children: rootNodes})
                        const node = treeModel.first((n) => n.model.id === action.noteData.id);

                        node.model.title = action.noteData.title

                        return {
                            ...state,
                            data: {
                                ...state.data,
                                [action.tabId]: rootNodes
                            },
                        }*/

            const tabData = state.data[action.tabId]

            const index = tabData ? tabData.findIndex(node => node.id === action.noteData.id) : -1
            if (index !== -1) {
                tabData[index] = {
                    ...tabData[index],
                    ...action.noteData
                }
            } else {
                state.data[action.tabId].push(action.noteData)
            }

            return state
        }
        case 'SET_NOTE_PARENT': {
            const {noteId, parentId, index} = action
            // window.alert(`SET_NOTE_PARENT ${noteId} ${parentId}`)

            const currentParent = Object.entries(state.childIds).find(e => e[1].indexOf(noteId) !== -1)

            if (currentParent) {
                const currentIndex = currentParent[1].findIndex(n => n == noteId)
                // window.alert(`currentParentIndex: ${currentParent}`)
                state.childIds[currentParent[0]].splice(currentIndex, 1)
            }

            if (state.childIds[parentId]) {
                state.childIds[parentId].splice(index, 0, noteId)
            } else {
                state.childIds[parentId] = [noteId]
            }

            return state;
        }
        case 'PUT_NOTE_AFTER': {
            const {parentId, noteId, afterId} = action
            // window.alert(`SET_NOTE_PARENT ${noteId} ${parentId}`)

            const currentParent = Object.entries(state.childIds).find(e => e[1].indexOf(noteId) !== -1)

            if (currentParent) {
                const currentIndex = currentParent[1].findIndex(n => n == noteId)
                // window.alert(`currentParentIndex: ${currentParent}`)
                state.childIds[currentParent[0]].splice(currentIndex, 1)
            }

            if (state.childIds[parentId]) {
                const index = state.childIds[parentId].indexOf(afterId) + 1
                state.childIds[parentId].splice(index, 0, noteId)
            } else {
                state.childIds[parentId] = [noteId]
            }

            return state;
        }
        case 'DELETE_NOTE': {
            const tabData = state.data[action.tabId]

            const index = tabData.findIndex(node => node.id === action.noteId)
            tabData.splice(index, 1)


            const currentParent = Object.entries(state.childIds).find(e => e[1].indexOf(action.noteId) !== -1)

            if (currentParent) {
                const currentIndex = currentParent[1].findIndex(n => n == action.noteId)
                state.childIds[currentParent[0]].splice(currentIndex, 1)
            }

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


export default noteReducer