import tabService from "../../../services/tabService";
import noteService from "../../../services/noteService";

export const editTab = (tabId, updatedTab) => {
    return async dispatch => {
        const editedTab = await tabService.editTab(tabId, updatedTab)
        console.log(editedTab)

        const tabs = await tabService.getAllTabs()
        const tabIds = tabs.map(t => t.id)
        const notes = await Promise.all(tabIds.map(async (tabId) => {
            const tabNotes = await noteService.getTabNotes(tabId)
            return tabNotes
        }))
        // const notes = getAllTabNotes()

        dispatch({
            type: 'EDIT_TAB',
            data: notes
        })
    }
}