import {INote, ITab, NodeId, TabId} from "../../model";

export type TabsState = {
    data: {[key: TabId]: ITab}
    loading: 'idle' | 'pending'
    currentRequestId: string | undefined
    error: any
}

export type TabAction =
    | { type: "INIT_TABS"; tabs: ITab[] }
    | { type: "SET_TAB"; tabData: ITab }
    | { type: "DELETE_TAB"; tabId: TabId }
    // | { type: "SET_CATALOG"; catalog: IStoreCatalog | null }
    // | { type: "SET_LINE_QTY"; lineId: LineId; qty: Quantity }

export type NotesState = {
    data: {[key: TabId]: NoteData[]}
    byParent: {[key: NodeId]: NodeId[]}
    loading: 'idle' | 'pending'
    currentRequestId: string | undefined
    error: any
}

export type NoteData = {
    id: NodeId
    title: string,
    draft?: boolean
}

export type NoteAction =
    // | { type: "INIT_NOTES"; children: INote[] }
    | { type: "SET_TAB_NOTES"; tabId: TabId, notes: INote[] }
    | { type: "ADD_ROOT_NOTE"; tabId: TabId, note: INote }
    | { type: "SET_NOTE"; tabId: TabId, noteData: INote }
    | { type: "SET_NOTE_PARENT"; noteId: NodeId, parentId: NodeId, index: number }
    | { type: "DELETE_NOTE"; tabId: TabId, noteId: NodeId }