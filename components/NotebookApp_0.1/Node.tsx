import classNames from "classnames";
import React, { FocusEvent, KeyboardEvent } from "react";
import { ChevronDown, ChevronRight, FileText, Folder, PenTool, FilePlus } from "react-feather";
import { NodeHandlers, NodeRendererProps } from "react-arborist";
import { MyData } from "./backend";

const size = 16;
const color = "#999";

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

function RenameForm({ defaultValue, submit, reset }: FormProps) {
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

  return <input type="text" {...inputProps} />;
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
  const folder = Array.isArray(data.children);
  const open = state.isOpen;
  const name = data.name;

  return (
    <div
      ref={innerRef}
      style={styles.row}
      className={classNames("row", state)}
      onClick={(e) => handlers.select(e)}
    >

      <div className="row-contents" style={styles.indent}>

        <MaybeToggleButton
          toggle={handlers.toggle}
          isOpen={open}
          isFolder={folder}
          isSelected={state.isSelected}
        />

        <i>
          <Icon isFolder={folder} isSelected={state.isSelected} />
        </i>

        {state.isEditing ? 
        (
          <RenameForm defaultValue={name} {...handlers} />
        ) 
        : 
        (
          <span>
            {name}{" "}
            {state.isSelected && (
              <>
              <button style={{ display: "inline" }} onClick={handlers.edit}>
                {/* ✍️  */}
                <PenTool style={{ paddingTop: '2' }} size='17' />
              </button>
              {" "}
              <button style={{ display: "inline" }} onClick={handlers.edit}>   
              {/* need to make this add another children in the same class */}
                <FilePlus style={{ paddingTop: '2' }} size='17' />
            </button>
            </>
            )}
          </span>
        )}

      </div>

    </div>
  );
};
