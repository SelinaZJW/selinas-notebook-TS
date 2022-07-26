import {NodeId, TabId} from "../../model";
import noteService from "../../../services/noteService";

export const addNote = (tabId: TabId, noteIdCallback: (NodeId) => void) => {
    const nodeId = "NOTE-" + Math.random().toString(16).slice(2)

    const newNote = {
        id: nodeId,
        title: "New note",
        isOpen: false
    }
    //dispatch(addNote(tabId, newNote))  //selected tab is wacked after updating


    return function (dispatch, getState) {


        // window.alert(`addRootNote`)

        dispatch({
            type: 'ADD_ROOT_NOTE',
            tabId,
            rootNode: newNote
        })

        noteIdCallback(nodeId)


        //return nodeId
    }
}