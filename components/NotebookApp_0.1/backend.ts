import { useCallback, useMemo, useState } from "react";
import TreeModel from "tree-model-improved";
// import { makeLargeData } from "./large-dataset";
import lineage from "./lineage";
import mock_data from "./mock_data";

function findById(node: any, id: string): TreeModel.Node<any> | null {
  return node.first((n: any) => n.model.id === id);
}

// const initData = lineage;
const initData = mock_data;
// const initData = makeLargeData();
export type MyData = {
  id: string;
  isOpen: boolean;
  name: string;
  children?: MyData[];
  level: number     //add hierarchy to database
};

function changeLevel(dataNode: MyData, parentLevel: number): MyData  {
  dataNode.level = parentLevel;
  if (dataNode.children) {
    dataNode.children = dataNode.children.map((child:any) => ({...child, level: dataNode.level +1}));
    dataNode.children.forEach(child => changeLevel(child, dataNode.level +1));    //change level recursively, to chang all children of children
  } 

  // console.log(dataNode)
  return dataNode;
}

// change all levels equals and above displayLevel to Open, and all levels below to Closed
function changeDisplay (dataNode: MyData, displayLevel: number): MyData {
  // dataNode.isOpen = true;
  // console.log(dataNode.level, displayLevel)
  if (dataNode.level < displayLevel) {
    dataNode.isOpen = true;
  }
  if (dataNode.level >= displayLevel) {
    dataNode.isOpen = false;
  }
  if (dataNode.children) {
    dataNode.children.forEach(child => changeDisplay(child, displayLevel)); 
  }

  console.log(dataNode)
  return dataNode;
}

function getDataDepth(dataNode: MyData): number {
  return Array.isArray(dataNode.children) ? 
    1 + Math.max(0, ...dataNode.children.map(getDataDepth)) :
    0;
}


export function useBackend() {
  const [data, setData] = useState<MyData>(initData as MyData);
  const root = useMemo(() => new TreeModel().parse(data), [data]);
  const find = useCallback((id) => findById(root, id), [root]);
  const update = () => setData({ ...root.model });
  const depth = getDataDepth(data)
  console.log(depth)

  return {
    data,
    depth,
    onMove: (
      srcIds: string[],
      dstParentId: string | null,
      dstIndex: number, 
    ) => {
      for (const srcId of srcIds) {
        const src = find(srcId);
        console.log(src);
        const dstParent = dstParentId ? find(dstParentId) : root;
        console.log(dstParent?.model);
        console.log(dstIndex);

        if (!src || !dstParent) return;

        //const newItem = new TreeModel().parse({...src.model, level: dstParent?.model.level + 1 });  //change hierarchy of moved item, how to change 
        const newItem = new TreeModel().parse(changeLevel(src.model, dstParent?.model.level + 1))
        dstParent.addChildAtIndex(newItem, dstIndex);
        src.drop();
      }
      update();
    },

    onToggle: (id: string, isOpen: boolean) => {
      const node = find(id);
      console.log(node)
      if (node) {
        node.model.isOpen = isOpen;
        update();
      }
    },

    onEdit: (id: string, name: string) => {
      const node = find(id);
      if (node) {
        node.model.name = name;
        update();
      }
    },

    onSetDisplay: (displayLevel: number) => {
      changeDisplay(data, displayLevel);
      update();
    },

    onDataUpdate: () => {
      update();
    }

  };
}
