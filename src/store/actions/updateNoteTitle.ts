import {NodeId, TabId} from "../../model";
import {useMemo} from "react";
import TreeModel from "tree-model-improved";
import {updateNote} from "./updateNote";

export const updateNoteTitle = (tabId: TabId, id: NodeId, title: string) => {

    return (dispatch, getState) => {
        console.log(`editNoteTitle(${id}, ${title})`)

        const rootNotes = getState().notes.data[tabId]
        console.log("tabData", rootNotes)

        const note = rootNotes.find(n => n.id === id)

        const updatedNote = {
            ...note,
            title
        }

        dispatch(updateNote(tabId, updatedNote.id, updatedNote))

        // getState.notes.data
    }
}