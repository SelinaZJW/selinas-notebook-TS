import tabService from "../../../services/tabService";

export const updateTab = (tabId, newTab) => {

    return async dispatch => {
        tabService.editTab(tabId, newTab).then(updatedTab => {
            dispatch({
                type: 'SET_TAB',
                tabData: {
                    id: tabId,
                    title: updatedTab.title
                }
            })
        })

        /*const tabs = await tabService.getAllTabs()
        const tabIds = tabs.map(t => t.id)
        const notes = await Promise.all(tabIds.map(async (tabId) => {
            const tabNotes = await noteService.getTabNotes(tabId)
            return tabNotes
        }))*/
        // const notes = getAllTabNotes()
    }
}