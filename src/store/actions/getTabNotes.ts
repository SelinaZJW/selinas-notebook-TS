import {TabId} from "../../model";
import tabService from "../../../services/tabService";

export const getTabNotes = (tabId: TabId) => {

    return (dispatch, getState) => {
        tabService.getTabNotes(tabId).then(tabTree => {
                return dispatch({
                    type: 'SET_TAB_NOTES',
                    tabId,
                    rootNodes: tabTree.children
                })
            }
        )
    }
}



