import React, {useEffect, useMemo, useRef, useState} from "react";
// import { TreeApi } from "react-arborist";
import {Tree, TreeApi} from "react-arborist";
// import { EditHandler, IdObj, MoveHandler, NodeRenderer, ToggleHandler } from "react-arborist/dist/types";
import {mkNode} from "../../../components/NotebookView/Node";
import {connect, useDispatch} from "react-redux";
import {RootState} from "../../store/store";
import {NodeId, TabId} from "../../model";
import {editNoteTitle} from "../../store/actions/editNoteTitle";
import {bindActionCreators} from "redux";
import {addRootNote} from "../../store/actions/addRootNote";
import {MyData} from "../../../components/NotebookView/types";
import {moveNotes} from "../../store/actions/moveNotes";

// export interface TreeProps<T> {
//   children: NodeRenderer<T>;
//   data: T;
//   height?: number;
//   width?: number;
//   rowHeight?: number;
//   indent?: number;
//   hideRoot?: boolean;
//   onToggle?: ToggleHandler;
//   onMove?: MoveHandler;
//   onEdit?: EditHandler;
//   getChildren?: string | ((d: T) => T[]);
//   isOpen?: string | ((d: T) => boolean);
//   disableDrag?: string | boolean | ((d: T) => boolean);
//   disableDrop?: string | boolean | ((d: T) => boolean);
//   openByDefault?: boolean;
//   className?: string | undefined;
//   handle?: Ref<TreeApi<T>>;
//   onClick?: MouseEventHandler;
//   onContextMenu?: MouseEventHandler;
//   tabId: string
// }

// export declare const Tree: <T extends IdObj>(props: TreeProps<T> & import("react").RefAttributes<TreeApi<T>>) => ReactElement<any, string | import("react").JSXElementConstructor<any>> | null;

const selectTabData = (tabId: TabId) => (state: RootState) => {
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

const NotebookDisplay = ({tabId, selectTabData, addRootNote, editNoteTitle, moveNotes}) => {
  console.log("#NotebookDisplay")

  const dispatch = useDispatch()

  const Node = mkNode(tabId)

  const treeApi = useRef<TreeApi>()

  const tabData = selectTabData(tabId)

  // const backend = useBackend({initData: tabData})

  const [editingId, setEditingId] = useState<NodeId>(undefined)

  useEffect(() => {
    console.log("editingId", editingId)

    if(!editingId) return

    treeApi.current.edit(editingId).then(value => {
      // window.alert(value)
    }).catch(onrejected => {
      window.alert(onrejected)
    })
  }, [treeApi, editingId])


  const addRootNoteClicked = () => {
    addRootNote(tabId, setEditingId)
  }

  const [toggleMap, setToggleMap] = useState<{[id: string]: boolean}>({})
  const isOpen = useMemo(
      () => (data: MyData) => {
        if(data.level == 0) return true;

        return toggleMap[data.id] || false
      }, [toggleMap]
  )
  function handleToggle(id: string, isOpen: boolean) {
    // window.alert(`Toggling ${id} to ${isOpen}`)

    setToggleMap({
      ...toggleMap,
      [id]: isOpen
    })
  }

  return (
    <div className="displayBox">
    <button onClick={addRootNoteClicked}>
      add
    </button>
     {/* <pre>
        {JSON.stringify(toggleMap, null, 2)}
      </pre>*/}
    <Tree
      ref={(tree: TreeApi) => {
        // @ts-ignore
        global.tree = tree;
        treeApi.current = tree
      }}

      className="notes"
      data={tabData}
      getChildren="children"
      isOpen={isOpen}
      width={700}
      height={490}
      // disableDrop={(d) => d.name === "House Arryn"}
      hideRoot
      indent={24}
      onMove={(dragIds, parentId, index) => moveNotes(tabId, dragIds, parentId, index)}
      onToggle={handleToggle}
      onEdit={(id, title) => editNoteTitle(tabId, id, title)}
      rowHeight={22}
      onClick={() => console.log("clicked the tree")}
      onContextMenu={() => console.log("context menu the tree")}
      // tabId={tabId}
    >
      {Node}
    </Tree>
      tabId: {tabId}
      Editing: {editingId}
      <pre>
        {JSON.stringify(tabData, null, 2)}
       </pre>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    selectTabData: tabId => selectTabData(tabId)(state)
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addRootNote,
    editNoteTitle,
    moveNotes
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookDisplay)