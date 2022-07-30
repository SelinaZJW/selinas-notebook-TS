import {ICreateNote, TabId} from "../../model";
import noteService from "../../../services/noteService";
import {getTabNotes} from "./getTabNotes";
import {nextNoteId} from "../util/nextNoteId";

export const createRootNote = (tabId: TabId, noteIdCallback: (NodeId) => void) => {
    const id = nextNoteId()

    const newNote: ICreateNote = {
        id,
        title: "New note",
        parentId: null
    }

    return async (dispatch, getState) => {

        dispatch({
            type: 'SET_NOTE',
            tabId,
            noteData: newNote
        })

        const newN = await noteService.createNewNote(tabId, newNote)
        console.log(newN)

        noteIdCallback(id)

        dispatch(getTabNotes(tabId))
    }
}