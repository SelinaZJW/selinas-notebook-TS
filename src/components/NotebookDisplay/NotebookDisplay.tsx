import React, {useEffect, useRef, useState} from "react";
import {Tree, TreeApi} from "react-arborist";
import {mkNode} from "./components/Node";
import {connect} from "react-redux";
import {NodeId} from "../../model";
import {setNoteTitle} from "../../store/actions/setNoteTitle";
import {bindActionCreators} from "redux";
import {addDraftNote} from "../../store/actions/addDraftNote";
import {MyData} from "./types";
import {moveNotes} from "../../store/actions/moveNotes";
import {selectTabTree} from "../../store/selectors/selectTabTree";
import DisplaySlider from "./components/DisplaySlider";
import {getTabNotes} from "../../store/actions/getTabNotes";

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

const NotebookDisplay = ({tabId, getTabNotes, selectTabData, addDraftNote, setNoteTitle, moveNotes}) => {
  console.log("#NotebookDisplay")



  const treeApi = useRef<TreeApi>()

  const tabData = selectTabData(tabId)

  useEffect(() => {
    getTabNotes(tabId)
  }, [])

  // const backend = useBackend({initData: tabData})

  const [editingId, setEditingId] = useState<NodeId>(undefined)
  const Node = mkNode(tabId, setEditingId)

  useEffect(() => {
    console.log("editingId", editingId)

    if(!editingId) return

    treeApi.current.edit(editingId)
  }, [treeApi, editingId])


  const addRootNoteClicked = () => {
    addDraftNote(tabId, undefined, "", undefined).then(setEditingId)
  }

  const [toggleMap, setToggleMap] = useState<{[id: string]: boolean}>({})

  const isOpen = (data: MyData) => {
        if(data.level == 0) return true;

        return toggleMap[data.id] || false
      }


  const handleToggle = (id: string, isOpen: boolean) => {
    console.log("toggleMap", toggleMap)
    console.log(`Toggling ${id} to ${isOpen}`)

    setToggleMap({
      ...toggleMap,
      [id]: isOpen
    })
  }



  return (<>
    <DisplaySlider tabId={tabId} setToggleMap={setToggleMap} />
    <div className="displayBox">
    <button onClick={addRootNoteClicked}>
      add
    </button>
{/*      <pre>
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
      onEdit={(id, title) => setNoteTitle(tabId, id, title)}
      rowHeight={22}
      onClick={() => console.log("clicked the tree")}
      onContextMenu={() => console.log("context menu the tree")}
      // tabId={tabId}
    >
      {Node}
    </Tree>
{/*      tabId: {tabId}
      Editing: {editingId}
      <pre>
        {JSON.stringify(tabData, null, 2)}
       </pre>*/}
    </div>
  </>);
}

const mapStateToProps = state => {
  return {
    selectTabData: tabId => selectTabTree(tabId)(state)
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getTabNotes,
    addDraftNote,
    setNoteTitle,
    moveNotes
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookDisplay)