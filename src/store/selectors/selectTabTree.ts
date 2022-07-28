import {TabId} from "../../model";
import {RootState} from "../store";

export const selectTabTree = (tabId: TabId) => (state: RootState) => {
    const tabData = state.tabs.data[tabId]
    const noteTree = state.notes.data[tabId]

    return {
        id: tabId,
        title: tabData?.title,
        level: 0,
        weight: 0,
        children: noteTree
    }
}