import React, { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";   

const useRefCallback = <T extends any[]>(
  value: ((...args: T) => void) | undefined,
  deps?: React.DependencyList
): ((...args: T) => void) => {
  const ref = React.useRef(value);

  React.useEffect(() => {
    ref.current = value;
  }, deps ?? [value]);

  const result = React.useCallback((...args: T) => {
    ref.current?.(...args);
  }, []);

  return result;
};


const Editable = ({init, onEdit}) => {
  const [value, setValue] = useState(init)

  const handleChange = useRefCallback((evt) => {
    setValue(evt.target.value);
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur();
    }
  }

  const handleBlur = useRefCallback(() => {
    console.log(value); // 👍 correct value
    onEdit(value)
    // dispatch(updateTab(html, props.tabId))
  }, [value]);

  return (
    <ContentEditable
      html={value}
      disabled={false} // use true to disable edition
      onChange={handleChange} // handle innerHTML change
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      style={{ minWidth: 20, border: 1}}
    />
  );

}

export default Editable
