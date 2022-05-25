import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Provider } from 'react-redux'
import { Content } from "../../components/NotebookApp_1/Content";
import store from "../../components/NotebookApp_1/store"
import { initializeTabs } from "../../reducers/tabReducer"
import { initializeAllNotes } from "../../reducers/noteReducer";

export function Main() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeTabs())
    dispatch(initializeAllNotes())
  }, [])

  const tabs = useSelector((state: any) => state.tabs)
  const tabNotes = useSelector((state: any) => state.notes)

  console.log(tabs)
  console.log(tabNotes)

  function setTabNotes (index) {
    const selectedTab = tabs.find((t: { index: any; }) => t.index === index)
    console.log(selectedTab)
    if (selectedTab) {
      const tabId = selectedTab?.id
      // dispatch(initializeTabNotes(tabId))
    }
  }

  return (
    // <Provider store={store}>
      <div>
        <main>
          <h1>Notebook Version 1.0</h1>
          
          <section className="content">
            <Content tabs={tabs} tabNotes={tabNotes} setTabNotes={setTabNotes}  />
          </section>
          
        </main>
        
      </div>
    // </Provider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
