import {TabId} from "../../model";
import {RootState} from "../store";

export const selectTabTree = (tabId: TabId) => (state: RootState) => {
    const tabData = state.tabs.data[tabId]
    const noteTree = state.notes.data[tabId]

    const children = noteTree ? arrayToTree(noteTree) : []

    return {
        id: tabId,
        title: tabData?.title,
        level: 0,
        weight: 0,
        children
    }
}

const arrayToTree = (allNodes, parent = null) =>
    allNodes.filter(node => node.parentId === parent)
        .map(child => ({ ...child, children: arrayToTree(allNodes, child.id) }));