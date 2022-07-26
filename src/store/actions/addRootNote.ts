import {TabId} from "../../model";
import noteService from "../../../services/noteService";
import {getTabNotes} from "./getTabNotes";

export const addRootNote = (tabId: TabId, noteIdCallback: (NodeId) => void) => {
    const newNote = {
        title: "New note"
    }

    return async (dispatch, getState) => {
        const newN = await noteService.createNewNote(tabId, newNote)
        console.log(newN)

        noteIdCallback(newN.id)

        dispatch(getTabNotes(tabId))
    }
}

/*
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
}*/
