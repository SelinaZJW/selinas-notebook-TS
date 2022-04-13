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


const Editable = (props) => {
  const [html, setHtml] = useState( `${props.init}`)

  const handleChange = useRefCallback((evt) => {
    setHtml(evt.target.value);
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur();
    }
  }

  const handleBlur = useRefCallback(() => {
    console.log(html); // 👍 correct value
  }, [html]);

  return (
    <ContentEditable
      html={html}
      disabled={false} // use true to disable edition
      onChange={handleChange} // handle innerHTML change
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      style={{ minWidth: 20, border: 1}}
    />
  );

}

export default Editable
