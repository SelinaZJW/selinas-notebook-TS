import {TabId} from "../../model";
import {RootState} from "../store";

export const selectTabTree = (tabId: TabId) => (state: RootState) => {
    const tabData = state.tabs.data[tabId]
    const noteTree = state.notes.data[tabId]
    const byParent = state.notes.byParent

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
        // const children = childNodeIds ? childNodeIds.map(nodeId => childrenOf(nodeId)) : []

        const children = childNodeIds ? childNodeIds.map(id => buildChild(id, parentId, level)) : []

        // return {
        //     ...note,
        //     children
        // }

        return children
    }

    function buildChild(nodeId, parentId, level) {
        const note = allNodes.find(note => note.id == nodeId)

        return {
            // id: nodeId,
            ...note,
            parentId,
            level,
            children: childrenOf(nodeId, level+1)
        }
    }

    return childrenOf(tabId, 1)

    // return allNodes.filter(node => node.parentId === parent)
        // .map(child => ({ ...child, children: buildTree(allNodes, byParent, child.id) }));
}


/*
const arrayToTree = (allNodes, parent = null) =>
    allNodes.filter(node => node.parentId === parent)
        .map(child => ({ ...child, children: arrayToTree(allNodes, child.id) }));*/
