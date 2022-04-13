import React from 'react';
import { Button } from 'devextreme-react/button';
import { Sortable } from 'devextreme-react/sortable';
import TabPanel from 'devextreme-react/tab-panel';
import 'devextreme/data/odata/store';
import 'devextreme/dist/css/dx.light.css';

import { mock_up } from './data.js';
import Editable from './Editable';
import { useBackend } from './backend'
import NotesDisplay from './NotesDisplay';
import DisplaySlider from './DisplaySlider_2'

const initData = mock_up

const Tabs_Drag = ({initData}) => {
  const [data, setData] = React.useState(initData);
  const [selectedItem, setSelectedItem] = React.useState(initData[0]);

  const EmployeeTemplate = (props) => {
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
    // const newItem = allEmployees
    //   .filter((employee) => employees.indexOf(employee) === -1)[0];

    // setEmployees([...employees, newItem]);
    // setSelectedItem(newItem);
    const newItem =
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
      <>
        <div>
          <span>
            <Editable init={`${data.title}`} />
          </span>
          {/* {" "} */}
          {/* <i className="dx-icon dx-icon-close" onClick={closeHandler} /> */}
          {/* {employees.length >= 2 && <i className="dx-icon dx-icon-close" onClick={closeHandler} />} */}
        </div>
      </>
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
  }

  return (
    <>
      <div id="container">
        <Button
          // disabled={disableButton()}
          text="Add"
          icon="add"
          type="default"
          onClick={addButtonHandler}
        />
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
          height={550}
          
          deferRendering={false}
          showNavButtons={true}
          selectedItem={selectedItem}
          repaintChangesOnly={true}
          onSelectionChanged={onSelectionChanged}
          scrollByContent={true}
          
          itemTitleRender={renderTitle}
          itemComponent={EmployeeTemplate}
        />
      </Sortable>

    </>
  );
}

export default Tabs_Drag
