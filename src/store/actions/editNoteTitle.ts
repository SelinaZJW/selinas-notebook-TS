import {NodeId, TabId} from "../../model";
import {useMemo} from "react";
import TreeModel from "tree-model-improved";
import {editNote} from "./editNote";

export const editNoteTitle = (tabId: TabId, id: NodeId, title: string) => {

    return (dispatch, getState) => {
        console.log(`editNoteTitle(${id}, ${title})`)

        const rootNotes = getState().notes.data[tabId]
        console.log("tabData", rootNotes)

        const root = new TreeModel().parse({children: rootNotes})
        const node = root.first((n) => n.model.id === id);

        const updatedNote = {
            ...node.model,
            title
        }

        dispatch(editNote(updatedNote.id, updatedNote))

        // getState.notes.data
    }
}