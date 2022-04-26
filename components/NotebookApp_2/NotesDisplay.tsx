import React from "react";
import { Tree, TreeApi } from "react-arborist";
import { Node } from "./Node";

export default function NotesDisplay({backend}) {
  // const backend = useBackend();

  return (
    <div className="displayBox">
    <button>
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
    >
      {Node}
    </Tree>  
    </div>
  );
}
