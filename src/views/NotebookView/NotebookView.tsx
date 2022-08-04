import React, {useEffect, useState} from "react";
import {useSelector, useDispatch, useStore} from 'react-redux'

import {initializeAllNotes} from "../../store/reducers/noteReducer";
import NotebookTabs from "../../components/NotebookTabs/NotebookTabs";

const NotebookView: React.FC = () => {
    const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(initializeTabs())
    dispatch(initializeAllNotes())
  }, [])
  
  // const tabs = useSelector((state: any) => state.tabs)

  const store = useStore()
  const tabs = useSelector((state: any) => state.tabs)
  const tabNotes = useSelector((state: any) => state.notes.data)
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
      <NotebookTabs />
      {/*<pre>
        {JSON.stringify(store.getState(), null, 2)}
      </pre>*/}
    </>
  }

  return (
      <>
        Add your first tab!
        <NotebookTabs initData={emptyDataSet} />
      </>
    
  );
}

export default NotebookView