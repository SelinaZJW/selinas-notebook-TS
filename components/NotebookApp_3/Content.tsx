import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import Tabs_Drag from "./Tabs"
import { initializeAllNotes } from "../../reducers/noteReducer";


export default function Content() {
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(initializeTabs())
    dispatch(initializeAllNotes())
  }, [])
  
  // const tabs = useSelector((state: any) => state.tabs)
  const tabNotes = useSelector((state: any) => state.notes)
  // console.log(tabs)
  console.log(tabNotes)

  let dataLoaded = false
  if (tabNotes.length !== 0) {
    dataLoaded = true
  }
  console.log(dataLoaded)

  const emptyDataSet = []



  if (dataLoaded === true) {
    return <>
      <Tabs_Drag initData={tabNotes} />
      <pre>
        {JSON.stringify(tabNotes, null, 2)}
      </pre>
    </>
  }

  return (
      <>
        Add your first tab!
        <Tabs_Drag initData={emptyDataSet} />
      </>
    
  );
}
