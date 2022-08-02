import noteService from "../../../services/noteService";
import {getTabNotes} from "./getTabNotes";

export const editNote = (noteId, updatedNote) => {
    return async dispatch => {
        console.log(`editNote`, updatedNote)
        const editedNote = await noteService.editNote(noteId, updatedNote)
        console.log(`editNote.result`, editedNote)
        // const tabId = editedNote.tabId
        // const updatedTabNotes = await notebookService.getTabNotes(tabId)

        // const notes = await getAllTabNotes()

        // dispatch(getTabNotes(editedNote.tabId))

        /*
        dispatch({
            type: 'SET_NOTE',
            tabId: editedNote.tabId,
            noteData: editedNote
        })*/
    }
}