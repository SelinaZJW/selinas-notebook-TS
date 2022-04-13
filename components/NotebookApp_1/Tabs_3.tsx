import React from 'react';
import { Button } from 'devextreme-react/button';
import { Sortable } from 'devextreme-react/sortable';
import TabPanel from 'devextreme-react/tab-panel';
import 'devextreme/data/odata/store';
import 'devextreme/dist/css/dx.light.css';

import service from './data.js';
import Editable from './Editable';
import { useBackend } from './backend'
import NotesDisplay from './NotesDisplay';


const EmployeeTemplate = (props) => {
  // const {
  //   FirstName, LastName, Picture, Position, Notes,
  // } = props.data;
  const backend = useBackend({initData: props.data})
  console.log(backend)

  return (
    <>
      <div className="employeeInfo">
        <p className="employeeNotes">
          <b>{`Position: ${props.data.Position}`}</b>
          <br />
          {props.data.Notes}
        </p>
      </div>
      <div className="caption">{`${props.data.FirstName} ${props.data.LastName}'s Tasks:`}</div>
      <NotesDisplay backend={backend} />
    </>
  );
}


const allEmployees = service.getEmployees();

const Tabs_Drag = () => {
  const [employees, setEmployees] = React.useState(allEmployees.slice(0, 3));
  const [selectedItem, setSelectedItem] = React.useState(allEmployees[0]);

  const addButtonHandler = () => {
    const newItem = allEmployees
      .filter((employee) => employees.indexOf(employee) === -1)[0];

    setEmployees([...employees, newItem]);
    setSelectedItem(newItem);
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
            {/* {data.FirstName} {data.LastName} */}
            <Editable init={`${data.FirstName} ${data.LastName}`} />
          </span>
          {" "}
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
    const newEmployees = [...employees];

    newEmployees.splice(e.fromIndex, 1);
    newEmployees.splice(e.toIndex, 0, e.itemData);

    setEmployees(newEmployees);
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
        data={employees}
        itemOrientation="horizontal"
        dragDirection="horizontal"
        onDragStart={onTabDragStart}
        onReorder={onTabDrop}
      >
        <TabPanel
          dataSource={employees}
          height={410}
          
          deferRendering={false}
          showNavButtons={true}
          selectedItem={selectedItem}
          repaintChangesOnly={true}
          onSelectionChanged={onSelectionChanged}
          
          itemTitleRender={renderTitle}
          itemComponent={EmployeeTemplate}
        />
      </Sortable>

    </>
  );
}

export default Tabs_Drag
