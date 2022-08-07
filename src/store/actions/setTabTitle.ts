import tabService from "../../../services/tabService";

export const setTabTitle = (tabId, title) => {
    return async dispatch => {
        const newTabData = {
            id: tabId,
            title
        }

        dispatch({
            type: 'SET_TAB',
            tabData: newTabData
        })

        const editedTab = await tabService.editTab(tabId, newTabData)
        console.log(editedTab)

        /*const tabs = await tabService.getAllTabs()
        const tabIds = tabs.map(t => t.id)
        const notes = await Promise.all(tabIds.map(async (tabId) => {
            const tabNotes = await noteService.getTabNotes(tabId)
            return tabNotes
        }))*/
        // const notes = getAllTabNotes()
    }
}