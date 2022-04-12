import React, { useState } from "react";
import { useBackend } from "./backend";
import DisplaySlider from "./DisplaySlider";
import NotesDisplay from "./NotesDisplay"
import { bookmarks } from "../../pages/api/mock-data-bookmarks";
import { criminal_law } from "../../pages/api/mock-data-criminal-law"
import NoteTabs from "./NoteTabs";
import Notes from "./Tabs";

export function Content() {
  const backend_b = useBackend({initData: bookmarks});
  const backend_cl = useBackend({initData: criminal_law});
  const [level, setLevel] = useState<number>( 1 );
  
  function handleSetDisplay() {
    backend_b.onSetDisplay(level);  //need to update in data display component
    // backend.onDataUpdate();  //need 2 data updates, why???
  }

  return (
      <>
        <DisplaySlider  level={level} setLevel={setLevel} handleSetDisplay={handleSetDisplay} maxLevel={backend_b.depth} /> 
        {/* <h3 className="tabTitle">{backend_b.data.title}</h3>
        <NotesDisplay backend={backend_b} />
        <NotesDisplay backend={backend_cl} /> */}
        {/* <NoteTabs backend_1={backend_b} backend_2={backend_cl} /> */}
        <Notes backend_1={backend_b} backend_2={backend_cl} />
      </>
    
  );
}
