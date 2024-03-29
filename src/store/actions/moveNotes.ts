import TreeModel from "tree-model-improved";
import {TabId} from "../../model";
import {updateNote} from "./updateNote";
import {selectTabTree} from "../selectors/selectTabTree";
import {MyData} from "../../components/NotebookDisplay/types";

export function changeLevel(dataNode: MyData, parentLevel: number): MyData  {
    dataNode.level = parentLevel;
    if (dataNode.children) {
        dataNode.children = dataNode.children.map((child:any) => ({...child, level: dataNode.level +1}));
        dataNode.children.forEach(child => changeLevel(child, dataNode.level +1));    //change level recursively, to chang all children of children
    }

    // console.log(dataNode)
    return dataNode;
}

function findById(node: any, id: string): TreeModel.Node<any> | null {
    return node.first((n: any) => n.model.id === id);
}

export const moveNotes = (
    tabId: TabId,
    srcIds: string[],
    dstParentId: string | null,
    dstIndex: number,
) => {
    console.log(`moveNotes(${tabId}, ${srcIds}, ${dstParentId}, ${dstIndex}`)

    return async (dispatch, getState) => {
        console.log(`moveNotes: ${srcIds}`)

        const tabRoot = selectTabTree(tabId)(getState())
        console.log(`tabRoot`, tabRoot)
        const root = new TreeModel().parse(tabRoot)
        // const node = root.first((n) => n.model.id === id);

        const dstParent = dstParentId ? findById(root, dstParentId) : root;

        const promises = srcIds.map(srcId => {
            console.log(`moveNotes for ${srcId}`)

            const src = findById(root, srcId);
            // console.log(src);

            // console.log(dstParent?.model);
            console.log(srcId, dstParentId, dstParent.model.level, dstIndex);
            console.log(dstParent.model.children[dstIndex-1]?.id)

            if (!src || !dstParent) return;

            const noteId = srcId;
            const isRoot = dstParent.model.level === 0;
            const first = dstIndex === 0;
            const parentId = isRoot ? null : dstParentId;
            const after = first ? null : dstParent.model.children[dstIndex-1]?.id

            const newNote = { isRoot, parentId, first, after }  //backend not working heree sometimes??
            console.log(newNote)

            const promise = dispatch(updateNote(tabId, noteId, newNote))     //selection go crazy again
            //difficult/unable to change order between files/not folders??

            //const newItem = new TreeModel().parse({...src.model, level: dstParent?.model.level + 1 });  //change hierarchy of moved item, how to change
            const newItem = new TreeModel().parse(changeLevel(src.model, dstParent?.model.level + 1))
            dstParent.addChildAtIndex(newItem, dstIndex);
            src.drop();

            dispatch({
                type: 'SET_NOTE_PARENT',
                noteId,
                parentId: dstParentId,
                index: dstIndex
            })

            return promise
        })

        return Promise.all(promises)
    }
}