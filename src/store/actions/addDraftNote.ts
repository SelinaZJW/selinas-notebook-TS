import {ICreateNote, INote, NodeId, TabId} from "../../model";
import noteService from "../../../services/noteService";
import {getTabNotes} from "./getTabNotes";
import {nextNoteId} from "../util/nextNoteId";
import {NoteData} from "../types";

export const addDraftNote = (tabId: TabId, parentId: NodeId, title: string, after?: NodeId) => {
    const id = nextNoteId()

    // const newNote: ICreateNote = {
    //     id,
    //     title: "New note"
    // }

    return async (dispatch, getState) => {

        dispatch({
            type: 'SET_NOTE',
            tabId,
            noteData: {
                id,
                parentId,
                title: "",
                draft: true
            }
        })

        if(after) {
            dispatch({
                type: 'PUT_NOTE_AFTER',
                noteId: id,
                parentId: parentId || tabId,
                afterId: after
            })
        } else {
            dispatch({
                type: 'SET_NOTE_PARENT',
                noteId: id,
                parentId: parentId || tabId,
                index: 0
            })
        }

        // const newN = await noteService.createNewNote(tabId, newNote)
        // console.log(newN)

        return id
    }
}