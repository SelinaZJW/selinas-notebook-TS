import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from 'react-redux'
import { useBackend } from "./backend";
import DisplaySlider from "./DisplaySlider";
import { bookmarks } from "../../pages/api/mock-data-bookmarks";
import { criminal_law } from "../../pages/api/mock-data-criminal-law"
// import NoteTabs from "./NoteTabs";
import Notes from "./Tabs";
// import { initializeTabs } from "../../reducers/tabReducer"
// import { initializeNotes } from "../../reducers/noteReducer";
// import { MyData } from "./types";

export function Content({tabs, tabNotes, setTabNotes}) {
  // const dispatch = useDispatch()
  const backend_b = useBackend({initData: bookmarks});
  const backend_cl = useBackend({initData: criminal_law});
  const [level, setLevel] = useState<number>( 1 );

  // useEffect(() => {
  //   dispatch(initializeTabs())
  //   setTabNotes(0)
  // }, [])
  
  // const tabs = useSelector((state: any) => state.tabs)
  // const tabNotes = useSelector((state: any) => state.notes)
  // console.log(tabs)
  // console.log(tabNotes)
  // const [data, setData] = useState<MyData>(tabNotes)

  const backend = useBackend({initData: bookmarks})  // does not change with the prop
  console.log(backend)

  function handleSetDisplay() {
    backend.onSetDisplay(level);  //need to update in data display component
  }

  // function setTabNotes (index) {
  //   const selectedTab = tabs.find((t: { index: any; }) => t.index === index)
  //   console.log(selectedTab)
  //   if (selectedTab) {
  //     const tabId = selectedTab?.id
  //     dispatch(initializeNotes(tabId))
  //     setData(tabNotes)
  //     console.log(data)
  //   }
  // }


  return (
      <>
        <DisplaySlider  level={level} setLevel={setLevel} handleSetDisplay={handleSetDisplay} maxLevel={backend.depth} /> 
        {/* <h3 className="tabTitle">{backend_b.data.title}</h3>
        <NotesDisplay backend={backend_b} />
        <NotesDisplay backend={backend_cl} /> */}
        {/* <NoteTabs backend_1={backend_b} backend_2={backend_cl} /> */}
        <Notes backend_1={backend_b} backend_2={backend_cl} tabs={tabs} setTabNotes={setTabNotes} backend={backend} />
      </>
    
  );
}
