import {TabAction, TabsState} from "../types";
import produce from "immer";

const initialState: TabsState = {
  data: {},
  orderedTabIds: [],
  currentRequestId: "", error: undefined, loading: undefined
}

const tabReducer = produce((state: TabsState = initialState, action: TabAction) => {
  switch(action.type) {
    case 'INIT_TABS': {
      action.tabs.forEach(tab => {
        state.data[tab.id] = tab
      })

      state.orderedTabIds = action.tabs.map(t => t.id)

      return state
    }
    case 'SET_TAB': {
      const tabData = state.data[action.tabData.id]

      state.data[action.tabData.id] = {
        ...tabData,
        ...action.tabData
      }

      return state
    }
    case 'DELETE_TAB': {
      const newData = {...state.data}
      delete newData[action.tabId]

      state.data = newData
      state.orderedTabIds = state.orderedTabIds.filter(tabId => tabId != action.tabId)

      return state
    }
    case 'SET_ORDERED_TAB_IDS':
      state.orderedTabIds = action.tabIds

      return state;
    default:
      return state
  } 
})

/*export const initializeTabs = () => {
  return async dispatch =>  {
    const tabs = await notebookService.getAllTabs()
    dispatch({
      type: 'INIT_TABS', 
      data: tabs
    })
  } 
}*/



export default tabReducer