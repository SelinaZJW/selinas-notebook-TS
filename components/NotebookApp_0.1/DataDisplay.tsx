import React, { useState } from "react";
// @ts-ignore
import AutoSize from "react-virtualized-auto-sizer";
import { Tree, TreeApi } from "react-arborist";
import { Node } from "./Node";
import { useBackend } from "./backend";
import DisplaySlider from "./DisplaySlider";

export function DataDisplay() {
  const backend = useBackend();
  const [level, setLevel] = useState<number>( 1 );
  
  function handleSetDisplay() {
    backend.onSetDisplay(level);  //need to update in data display component
    // backend.onDataUpdate();  //need 2 data updates, why???
  }

  return (
    <AutoSize>
      {(props: any) => (
        <>
        <DisplaySlider  level={level} setLevel={setLevel} handleSetDisplay={handleSetDisplay} /> 
        <Tree
          ref={(tree: TreeApi) => {
            // @ts-ignore
            global.tree = tree;
          }}
          className="displayBox"
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
        </>
      )}
    </AutoSize>

    
  );
}
