import React, { MouseEventHandler, ReactElement, Ref } from "react";
// import { TreeApi } from "react-arborist";
import { TreeApi, Tree } from "react-arborist";
// import { EditHandler, IdObj, MoveHandler, NodeRenderer, ToggleHandler } from "react-arborist/dist/types";
import { mkNode } from "../../../components/NotebookView/Node";

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

export default function NotebookDisplay({backend, addRootNote, tabId}) {
  // const backend = useBackend();

  const Node = mkNode(tabId)
  
  return (
    <div className="displayBox">
    <button onClick={addRootNote}>
      add 
    </button>
    <Tree
      ref={(tree: TreeApi) => {
        // @ts-ignore
        global.tree = tree;
      }}
      
      className="notes"
      data={backend?.data}
      getChildren="children"
      isOpen="isOpen"
      width={700}
      height={490}
      // disableDrop={(d) => d.name === "House Arryn"}
      hideRoot
      indent={24}
      onMove={backend?.onMove}
      onToggle={backend?.onToggle}
      onEdit={backend?.onEdit}
      rowHeight={22}
      onClick={() => console.log("clicked the tree")}
      onContextMenu={() => console.log("context menu the tree")}
      // tabId={tabId}
    >
      {Node}
    </Tree>  
    </div>
  );
}
