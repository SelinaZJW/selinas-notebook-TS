import notebookService from "../../../services/notebookService";

export const deleteTab = (tabId) => {
    return async dispatch => {
        await notebookService.deleteTab(tabId)

        return dispatch({
            type: 'DELETE_TAB',
            tabId
        })
    }
}