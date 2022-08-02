import noteService from "../../../services/noteService";
import {getTabNotes} from "./getTabNotes";
import {nextNoteId} from "../util/nextNoteId";

export const createNote = (tabId, newNote) => {
    return async dispatch => {
        const id = nextNoteId()

        dispatch({
            type: 'SET_NOTE',
            tabId,
            noteData: {
                id,
                ...newNote
            }
        })

        const newN = await noteService.createNewNote(tabId, newNote)
        console.log(newN)

        getTabNotes(tabId)

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