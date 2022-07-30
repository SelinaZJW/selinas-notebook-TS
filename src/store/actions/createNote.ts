import {NodeId, TabId} from "../../model";
import noteService from "../../../services/noteService";
import {getTabNotes} from "./getTabNotes";

export const createNote = (tabId, newNote) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTE',
            tabId,
            noteData: newNote
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