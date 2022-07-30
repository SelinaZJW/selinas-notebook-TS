import {TabId} from "../../model";
import noteService from "../../../services/noteService";

export const getTabNotes = (tabId: TabId) => {

    return (dispatch, getState) => {
        noteService.getTabNotes(tabId).then(result => {
                console.log("getTabNotes", result)

                return dispatch({
                    type: 'SET_TAB_NOTES',
                    tabId,
                    notes: result
                })
            }
        )
    }
}



