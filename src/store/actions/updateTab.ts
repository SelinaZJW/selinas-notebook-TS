import tabService from "../../../services/tabService";

export const updateTab = (tabId, updatedTab) => {
    return async dispatch => {
        dispatch({
            type: 'SET_TAB',
            tabData: {
                id: tabId,
                title: updatedTab.title
            }
        })

        const editedTab = await tabService.editTab(tabId, updatedTab)
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