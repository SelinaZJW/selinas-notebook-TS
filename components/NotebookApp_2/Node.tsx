import classNames from "classnames";
import React, { CSSProperties, FocusEvent, KeyboardEvent, MouseEventHandler, useState } from "react";
import { ChevronDown, ChevronRight, FileText, Folder, PenTool, FilePlus, Trash2 } from "react-feather";
import { NodeHandlers,  NodeState, TreeApi } from "react-arborist";
import { MyData } from "./types"
import { EditResult } from "react-arborist/dist/types";
import useAddNote from "./backend/useAddNote";
import useDeleteNote from "./backend/useDeleteNote";

const size = 16;
const color = "#999";

// export declare type NodeHandlers = {
//   toggle: MouseEventHandler;
//   select: (e: MouseEvent, args: {
//       selectOnClick: boolean;
//   }) => void;
//   edit: () => Promise<EditResult>;
//   submit: (name: string) => void;
//   reset: () => void;
// };

export declare type NodeRendererProps<T> = {
  innerRef: (el: HTMLDivElement | null) => void;
  styles: {
      row: CSSProperties;
      indent: CSSProperties;
  };
  data: T;
  state: NodeState;
  handlers: NodeHandlers;
  tree: TreeApi<T>;
  preview: boolean;
};

function Icon({ isFolder, isSelected }: any) {
  if (isFolder) {
    return (
      <Folder
        className="folder"
        stroke={isSelected ? "black" : "cornflowerblue"}
        fillOpacity="0.5"
        fill={isSelected ? "black" : "cornflowerblue"}
        size={size}
      />
    );
  } else {
    return (
      <FileText
        className="file"
        stroke={isSelected ? "black" : "#333"}
        strokeOpacity={isSelected ? "0.8" : "0.4"}
        fill="none"
        size={size}
      />
    );
  }
}

function MaybeToggleButton({ toggle, isOpen, isFolder, isSelected }: any) {
  if (isFolder) {
    const Icon = isOpen ? ChevronDown : ChevronRight;
    return (
      <button tabIndex={-1} onClick={toggle}>
        <Icon size={12} stroke={isSelected ? "white" : color} />
      </button>
    );
  } else {
    return <div className="spacer" />;
  }
}

type FormProps = { defaultValue: string } & NodeHandlers;

function EditForm({ defaultValue, submit, reset }: FormProps) {
  const inputProps = {
    defaultValue,
    autoFocus: true,
    onBlur: (e: FocusEvent<HTMLInputElement>) => {
      submit(e.currentTarget.value);
    },
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "Enter":
          submit(e.currentTarget.value);
          break;
        case "Escape":
          reset();
          break;
      }
    },
  };

  return <input type="text" {...inputProps} style={{margin: "2px"}} />;
}


//how to make display update Node immediately???
export const Node = ({
  innerRef,
  data,
  styles,
  state,
  handlers,
  tree,
}: NodeRendererProps<MyData>) => {
  const folder = Array.isArray(data.children) && data.children?.length !== 0
  const open = state.isOpen;
  const title = data.title;
  // const [showDetails, setShow] = useState(false);

  // function handleShowDetails () {

  // }

  const addNote = useAddNote()
  const deleteNote = useDeleteNote()

  return (
    <div
      ref={innerRef}
      style={styles.row}
      //style={{height: '80px'}}
      className={classNames("row", state)}
      onClick={(e) => handlers.select(e, {selectOnClick: true})}
    >
      <div className="row-contents" style={{...(styles.indent), border: "0px solid red"}}>        

        <div style={{display: "inline-flex", border: "0px solid black"}}>
          <MaybeToggleButton
            toggle={handlers.toggle}
            isOpen={open}
            isFolder={folder}
            isSelected={state.isSelected}
          />

          <i style={{paddingTop: "3px"}}>
            <Icon isFolder={folder} isSelected={state.isSelected} />
          </i>
        </div>

        <div>
        {state.isEditing ? 
        (
          <EditForm defaultValue={title} {...handlers} />
        ) 
        : 
        (
          <div>
          <div>
            {title}{" "}
            {state.isSelected && (
              <>
                <button style={{ display: "inline" }} onClick={handlers.edit}>
                  {/* ✍️  */}
                  <PenTool style={{ paddingTop: '3' }} size='17' />
                </button>
                {" "}
                <button style={{ display: "inline" }} onClick={() => addNote(data.id)}>   
                {/* need to make this add another children in the same class */}
                  <FilePlus style={{ paddingTop: '2' }} size='17' />
                </button>
                {" "}
                <button style={{ display: "inline" }} onClick={() => deleteNote(data.id)}>   
                  <Trash2 style={{ paddingTop: '2' }} size='17' />
                </button>
                {/* <button style={{ display: "inline" }} onClick={handlers.edit}>   
                  show details
                </button> */}
              </>
            )}
          </div>
          </div>
        )}

          {/* <div>   
              NoteId: {JSON.stringify(data.id, null, 2)}
          </div> */}
        </div>
      </div>
        
    </div>
  );
};
