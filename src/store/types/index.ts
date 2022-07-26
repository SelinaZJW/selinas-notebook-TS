import {INote, ITab, ITreeNode, TabId} from "../../model";


export type TabsState = {
    data: {[key: TabId]: ITab}
    loading: 'idle' | 'pending'
    currentRequestId: string | undefined
    error: any
}

export type TabAction =
    | { type: "INIT_TABS"; tabs: ITab[] }
    | { type: "SET_TAB"; tab: ITab }
    // | { type: "SET_CATALOG"; catalog: IStoreCatalog | null }
    // | { type: "SET_LINE_QTY"; lineId: LineId; qty: Quantity }

export type NotesState = {
    data: {[key: TabId]: ITreeNode[]}
    loading: 'idle' | 'pending'
    currentRequestId: string | undefined
    error: any
}

export type NoteAction =
    // | { type: "INIT_NOTES"; children: INote[] }
    | { type: "SET_TAB_NOTES"; tabId: TabId, rootNodes: ITreeNode[] }
    | { type: "ADD_ROOT_NOTE"; tabId: TabId, rootNode: ITreeNode }
    | { type: "SET_NOTE"; tabId: TabId, noteData: INote }