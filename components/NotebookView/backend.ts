import {useCallback, useMemo, useState} from "react";
import TreeModel from "tree-model-improved";
import {MyData} from "./types";
import {useDispatch} from 'react-redux';
import {updateNote} from "../../src/store/actions/updateNote";

function findById(node: any, id: string): TreeModel.Node<any> | null {
  return node.first((n: any) => n.model.id === id);
}


export function changeLevel(dataNode: MyData, parentLevel: number): MyData  {
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

  // console.log(dataNode)
  return dataNode;
}

function getDataDepth(dataNode: MyData): number {
  return (Array.isArray(dataNode.children) && dataNode.children?.length !== 0) ? 
    1 + Math.max(0, ...dataNode.children.map(getDataDepth)) :
    0;
}



export function useBackend(props: {initData: MyData}) {
  const [data, setData] = useState<MyData>(props.initData as MyData);
  const root = useMemo(() => new TreeModel().parse(data), [data]);
  const find = useCallback((id) => findById(root, id), [root]);
  const update = () => setData({ ...root.model });
  const depth = getDataDepth(data);
  const dispatch = useDispatch();
  // console.log(depth)

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
        // console.log(src);
        const dstParent = dstParentId ? find(dstParentId) : root;
        // console.log(dstParent?.model);
        console.log(srcId, dstParentId, dstParent.model.level, dstIndex);
        console.log(dstParent.model.children[dstIndex-1]?.id)

        if (!src || !dstParent) return;

        const noteId = srcId;
        const isRoot = dstParent.model.level === 0 ? true : false;
        const first = dstIndex === 0 ? true : false;
        const parentId = isRoot ? null : dstParentId;
        const after = first ? null : dstParent.model.children[dstIndex-1]?.id

        const newNote = { isRoot, parentId, first, after }  //backend not working heree sometimes??
        console.log(newNote)
        // dispatch(updateNote(noteId, newNote))     //selection go crazy again
        //difficult/unable to change order between files/not folders??

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

    onEdit: (id: string, title: string) => {
      console.log("onEdit", root)
      const node = find(id);
      console.log(node.model.id, title)
      const updatedNote = {title: title}
      const noteId = node.model.id
      // dispatch(updateNote(noteId, updatedNote))   //selection go crazy

      if (node) {
        node.model.title = title;
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
