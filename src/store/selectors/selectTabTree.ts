import {TabId} from "../../model";
import {RootState} from "../store";

export const selectTabTree = (tabId: TabId) => (state: RootState) => {
    const tabData = state.tabs.data[tabId]
    const noteTree = state.notes.data[tabId]
    const byParent = state.notes.childIds

    const children = noteTree ? buildTree(tabId, noteTree, byParent) : []

    return {
        id: tabId,
        title: tabData?.title,
        level: 0,
        children
    }
}

const buildTree = (tabId, allNodes, byParent) => {
    function childrenOf(parentId, level) {
        const childNodeIds = byParent[parentId]

        return childNodeIds ? childNodeIds.map(id => buildChild(id, parentId, level)) : []
    }

    function buildChild(nodeId, parentId, level) {
        const note = allNodes.find(note => note.id == nodeId)

        return {
            ...note,
            parentId,
            level,
            children: childrenOf(nodeId, level+1)
        }
    }

    return childrenOf(tabId, 1)
}