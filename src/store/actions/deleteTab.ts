import tabService from "../../../services/tabService";

export const deleteTab = (tabId) => {
    return async dispatch => {
        await tabService.deleteTab(tabId)

        return dispatch({
            type: 'DELETE_TAB',
            tabId
        })
    }
}