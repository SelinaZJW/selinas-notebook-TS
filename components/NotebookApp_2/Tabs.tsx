import React from 'react';
// import { Button } from 'devextreme-react/button';
import { Button } from '@mui/material';
import { Sortable } from 'devextreme-react/sortable';
import TabPanel from 'devextreme-react/tab-panel';
import 'devextreme/data/odata/store';
import 'devextreme/dist/css/dx.light.css';
import { Plus } from 'react-feather'
import { nanoid } from "nanoid";

// import { mock_up } from './data.js';
import Editable from './Editable';
import { useBackend } from './backend'
import NotesDisplay from './NotesDisplay';
import DisplaySlider from './DisplaySlider'

// const initData = mock_upx

const Tabs_Drag = ({initData}) => {
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

  const addButtonHandler = () => {
    const newItem = {
      id: nanoid(),
      isOpen: true,
      title: "new tab",
      children: [],
      level: 0,  
      index: data.length,
    };
    setData([...data, newItem]);
    setSelectedItem(newItem);

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

  const renderTitle = (data) => {
    // const closeHandler = () => {
    //   closeButtonHandler(data);
    // }
    return (
        <div>
          <span >
            <Editable init={`${data.title}`} />
          </span>
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
    <>
      <div id="container">
        {/* <Button
          // disabled={disableButton()}
          text="Add"
          icon="add"
          type="default"
          onClick={addButtonHandler}
        /> */}
        <Button  variant="contained" onClick={addButtonHandler} id="addButton" >
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

    </>
  );
}

export default Tabs_Drag
