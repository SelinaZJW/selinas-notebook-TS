import React from 'react';
import { Button } from '@mui/material';
import { Sortable } from 'devextreme-react/sortable';
import TabPanel from 'devextreme-react/tab-panel';
import 'devextreme/data/odata/store';
import 'devextreme/dist/css/dx.light.css';
import { Plus, Trash2 } from 'react-feather'
import { nanoid } from "nanoid";

// import { mock_up } from './data.js';
import Editable from './Editable';
import { useBackend } from './backend'
import NotesDisplay from './NotesDisplay';
import DisplaySlider from './DisplaySlider'

import { useDispatch } from 'react-redux';
import { editTab, addTab, deleteTab } from "../../reducers/noteReducer"

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

// const initData = mock_upx

const Tabs_Drag = ({initData}) => {
  const dispatch = useDispatch()
  const [data, setData] = React.useState(initData);
  const [selectedItem, setSelectedItem] = React.useState(initData[0]);

  const NotesTemplate = (props) => {
    const backend = useBackend({initData: props.data})
    console.log(backend)

    return (
      <>
        <DisplaySlider backend={backend} />
        <NotesDisplay backend={backend} />
      </>
    );
  }

  const addTabHandler = () => {
    // const newItem = {
    //   id: nanoid(),
    //   isOpen: true,
    //   title: "new tab",
    //   children: [],
    //   level: 0,  
    //   index: data.length,
    // };
    // setData([...data, newItem]);
    // setSelectedItem(newItem);

    dispatch(addTab("new tab"))  //not updating???

    console.log('add')
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

    return (
        <div className='singleTab'>
            <Editable init={`${data.title}`} onEdit={newValue => dispatch(editTab(newValue, data.id))} />
            <button id="deleteTabButton" onClick={deleteTab} >   
              <Trash2 style={{ paddingTop: '2' }} size='17' id='deleteTabIcon' />
            </button>
          
          {/* {" "} */}
          {/* <i className="dx-icon dx-icon-close" onClick={closeHandler} /> */}
          {/* {employees.length >= 2 && <i className="dx-icon dx-icon-close" onClick={closeHandler} />} */}
        </div>
    );
  }

  const onSelectionChanged = (args) => {
    setSelectedItem(args.addedItems[0]);
  }

  const onTabDragStart = (e) => {
    e.itemData = e.fromData[e.fromIndex];
  }

  const onTabDrop = (e) => {
    const newData = [...data];
    newData.splice(e.fromIndex, 1);
    newData.splice(e.toIndex, 0, e.itemData);

    setData(newData);
    // newData.forEach, edit index for each id
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div id="container">
        {/* <Button
          // disabled={disableButton()}
          text="Add"
          icon="add"
          type="default"
          onClick={addButtonHandler}
        /> */}
        <Button  variant="contained" onClick={addTabHandler} id="addTabButton" >
          <Plus style={{ paddingTop: '2', color: "white" }} size="20" /> 
        </Button>
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
