import React from 'react';
import { Button } from '@mui/material';
import { Sortable } from 'devextreme-react/sortable';
import TabPanel from 'devextreme-react/tab-panel';
import 'devextreme/data/odata/store';
import 'devextreme/dist/css/dx.light.css';
import { Plus, Trash2 } from 'react-feather'
import Tooltip from '@mui/material/Tooltip';
// import { nanoid } from "nanoid";

// import { mock_up } from './data.js';
import Editable from './Editable';
import { useBackend } from './backend'
import NotesDisplay from './NotesDisplay';
import DisplaySlider from './DisplaySlider'

import { useDispatch } from 'react-redux';
import { editTab, addTab, deleteTab, addRootNote } from "../../reducers/noteReducer"

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

// const initData = mock_upx

const Tabs_Drag = ({initData}) => {
  const dispatch = useDispatch()
  const [data, setData] = React.useState(initData);
  // const data = initData
  const [selectedItem, setSelectedItem] = React.useState(initData[0]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const NotesTemplate = (props) => {
    const backend = useBackend({initData: props.data})
    const tabId = selectedItem?.id
    console.log(backend)

    const addRootNote2 = () => {
      const newNote = {title: "New note"}
      //dispatch(addNote(tabId, newNote))  //selected tab is wacked after updating
      dispatch(addRootNote(tabId, newNote))
      // setSelectedIndex(0)
    }

    return (
      <>
        <DisplaySlider backend={backend} />
        <NotesDisplay backend={backend} addRootNote={addRootNote2} tabId={tabId}/>
      </>
    );
  }

  const addTabHandler = () => {
    const newItem = {
      isOpen: true,
      title: "new tab",
      children: [],
      level: 0,  
      index: data.length,
    };
    setData([...data, newItem]);
    setSelectedItem(newItem);

    

    // dispatch(addTab("new tab", selectedItem?.id)) 
    dispatch(addTab("new tab"))

    //console.log(selectedItem?.id)
  }

  // function disableButton() {
  //   return employees.length === allEmployees.length;
  // }

  // const closeButtonHandler = (item) => {
  //   const newEmployees = [...employees];
  //   const index = newEmployees.indexOf(item);

  //   newEmployees.splice(index, 1);
  //   setEmployees(newEmployees);

  //   if (index >= newEmployees.length && index > 0) {
  //     setSelectedItem(newEmployees[index - 1]);
  //   }
  // }

  const deleteTabHandler = (tabId) => {
    if (window.confirm("Are you sure you want to delete the tab and all its note content?")) {
      const newData = data.filter(d => d.id !== tabId)
      setData(newData)
      console.log('delete')

      dispatch(deleteTab(tabId))
    }
  }

  const renderTitle = (data) => {
    // const closeHandler = () => {
    //   closeButtonHandler(data);
    // }

    const deleteTab = () => {
      deleteTabHandler(data.id)
    }

    const editTabTitle = (newValue) => {
      const updatedTab = {title: newValue}
      dispatch(editTab(data.id, updatedTab))
    }

    return (
        <div className='singleTab'>
            <Editable init={`${data.title}`} onEdit={newValue => editTabTitle(newValue)} />
            <Tooltip title="delete entire tab" arrow>
              <button id="deleteTabButton" onClick={deleteTab} >   
                <Trash2 style={{ paddingTop: '2' }} size='17' id='deleteTabIcon' />
              </button>
            </Tooltip>
          {/* {" "} */}
          {/* <i className="dx-icon dx-icon-close" onClick={closeHandler} /> */}
          {/* {employees.length >= 2 && <i className="dx-icon dx-icon-close" onClick={closeHandler} />} */}
        </div>
    );
  }

  const onSelectionChanged = (args) => {
    console.log("onSelectionChanged")
    setSelectedItem(args.addedItems[0]);

    //idx is always -1
    // const idx = initData.findIndex(d => d.id == args.addedItems[0].id)
    // console.log("Selectioend has changed to", idx)

    setSelectedIndex(-1)
    console.log(selectedIndex)
  }

  const onTabDragStart = (e) => {
    e.itemData = e.fromData[e.fromIndex];
  }


  //lag in updating, selection is a little crazy
  const onTabDrop = async (e) => {
    const newData = [...data];
    newData.splice(e.fromIndex, 1);
    newData.splice(e.toIndex, 0, e.itemData);
    setData(newData);



    const tabId = e.itemData.id
    console.log(tabId)
    // const tabPreId = e.toData[e.toIndex-1].id

    if (e.toIndex === 0 && e.fromIndex !== e.toIndex) {
      const updatedTab = {first: true}
      dispatch(editTab(tabId, updatedTab))
      console.log("changed to first")
    }
    if (e.toIndex !== 0 && e.fromIndex > e.toIndex) {
      const afterId = e.toData[e.toIndex-1].id
      const updatedTab = {after: afterId}
      dispatch(editTab(tabId, updatedTab))
      // setSelectedItem(e.toData[e.toIndex])
      console.log(`changed to front to ${[e.toIndex]} `)
    }
    if (e.toIndex !== 0 && e.fromIndex < e.toIndex) {
      const afterId = e.toData[e.toIndex].id
      const updatedTab = {after: afterId}
      dispatch(editTab(tabId, updatedTab))
      // setSelectedItem(e.toData[e.toIndex + 1])
      console.log(`changed to later to ${[e.toIndex]} `)
    }

    //setSelectedItem(e.itemData)
    setSelectedIndex(e.toIndex)
    //console.log(e.itemData)
  }

  return (
    <DndProvider backend={HTML5Backend}>   
      {/* solve problem of cannot have 2 html5 backends */}
      <div id="container">
        {/* <Button
          // disabled={disableButton()}
          text="Add"
          icon="add"
          type="default"
          onClick={addButtonHandler}
        /> */}
        <Tooltip title="add new tab" arrow>
          <Button  variant="contained" onClick={addTabHandler} id="addTabButton" >
            <Plus style={{ paddingTop: '2', color: "white" }} size="20" /> 
          </Button>
        </Tooltip>
      </div>

      <Sortable
        filter=".dx-tab"
        data={data}
        itemOrientation="horizontal"
        dragDirection="horizontal"
        onDragStart={onTabDragStart}
        onReorder={onTabDrop}
        
      >
        <TabPanel
          dataSource={data}
          // height={550}
          className="tabsBox"
          
          deferRendering={false}
          showNavButtons={true}
          selectedItem={selectedItem}
          selectedIndex={selectedIndex}
          repaintChangesOnly={true}
          onSelectionChanged={onSelectionChanged}
          scrollingEnabled={true}
          scrollByContent={true}
          
          itemTitleRender={renderTitle}
          itemComponent={NotesTemplate}
        />
      </Sortable>

    </DndProvider>
  );
}

export default Tabs_Drag
