import React from "react";
// @ts-ignore
import AutoSize from "react-virtualized-auto-sizer";
import { Tree, TreeApi } from "react-arborist";
import { Node } from "./Node";
import { useBackend } from "./backend";

export function DataDisplay() {
  const backend = useBackend();

  return (
    <AutoSize>
      {(props: any) => (
        <Tree
          ref={(tree: TreeApi) => {
            // @ts-ignore
            global.tree = tree;
          }}
          className="react-aborist"
          data={backend.data}
          getChildren="children"
          isOpen="isOpen"
          // disableDrop={(d) => d.name === "House Arryn"}
          hideRoot
          indent={24}
          onMove={backend.onMove}
          onToggle={backend.onToggle}
          onEdit={backend.onEdit}
          rowHeight={22}
          width={props.width}
          height={props.height}
          onClick={() => console.log("clicked the tree")}
          onContextMenu={() => console.log("context menu the tree")}
        >
          {Node}
        </Tree>
      )}
    </AutoSize>
  );
}
