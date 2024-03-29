import tabService from "../../../services/tabService";

export const createTab = (title, after?) => {
    return async dispatch => {
        const newTab = await tabService.createNewTabAfter(title, after)
        console.log(newTab)

        dispatch({
            type: 'SET_TAB',
            tabData: newTab
        })

        return newTab
    }
}