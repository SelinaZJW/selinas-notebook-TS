import React, {useEffect} from 'react';
import {Button} from '@mui/material';
import {Sortable} from 'devextreme-react/sortable';
import TabPanel from 'devextreme-react/tab-panel';
import 'devextreme/data/odata/store';
import 'devextreme/dist/css/dx.light.css';
import {Plus, Trash2} from 'react-feather'
import Tooltip from '@mui/material/Tooltip';
import Editable from '../../../components/NotebookView/Editable';
import NotebookDisplay from '../NotebookDisplay/NotebookDisplay';

import {connect, useSelector} from 'react-redux';

import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'
import {selectTabTree} from "../../store/selectors/selectTabTree";
import {bindActionCreators} from "redux";
import {addTab} from "../../store/actions/addTab";
import {editTab} from "../../store/actions/editTab";
import {deleteTab} from "../../store/actions/deleteTab";

const NotesTemplate = (props) => {
  const tabId = props.data.id

  return (
      <>
        <NotebookDisplay tabId={tabId} />
        {/*{JSON.stringify(backend.data, null ,2)}*/}
      </>
  );
}

const NotebookTabs: React.FC<any> = ({addTab, editTab, deleteTab}) => {
  const tabs = useSelector((state: any) => Object.values(state.tabs.data))

  const [data, setData] = React.useState([]);

  useEffect(() => {
    if(data.length == tabs.length) return;

    setData(tabs)
  }, [tabs])

  const [selectedItem, setSelectedItem] = React.useState(tabs[0]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const addTabHandler = () => {
    const newItem = {
      isOpen: true,
      title: "new tab",
      children: [],
      level: 0,
      index: data.length,
    };

    addTab("new tab").then(newTab => {
      setData([...data, newTab]);
      setSelectedItem(newTab);
    })


    // dispatch(addTab("new tab", selectedItem?.id))

    //console.log(selectedItem?.id)
  }

  const deleteTabHandler = (tabId) => {
    if (window.confirm("Are you sure you want to delete the tab and all its note content?")) {
      // const newData = data.filter(d => d.id !== tabId)
      // setData(newData)
      // console.log('delete')

      deleteTab(tabId)
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
      editTab(data.id, updatedTab)
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
    // window.alert("onTabDrop")

    const newData = [...data];
    newData.splice(e.fromIndex, 1);
    newData.splice(e.toIndex, 0, e.itemData);
    setData(newData);

    const tabId = e.itemData.id
    console.log(tabId)
    // const tabPreId = e.toData[e.toIndex-1].id

    if (e.toIndex === 0 && e.fromIndex !== e.toIndex) {
      const updatedTab = {first: true}
      editTab(tabId, updatedTab)
      console.log("changed to first")
    }
    if (e.toIndex !== 0 && e.fromIndex > e.toIndex) {
      const afterId = e.toData[e.toIndex-1].id
      const updatedTab = {after: afterId}
      editTab(tabId, updatedTab)
      // setSelectedItem(e.toData[e.toIndex])
      console.log(`changed to front to ${[e.toIndex]} `)
    }
    if (e.toIndex !== 0 && e.fromIndex < e.toIndex) {
      const afterId = e.toData[e.toIndex].id
      const updatedTab = {after: afterId}
      editTab(tabId, updatedTab)
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
{/*        <pre>
        {JSON.stringify(tabs, null, 2)}
      </pre>
        <pre>
        {JSON.stringify(data, null, 2)}
      </pre>*/}
      </Sortable>

    </DndProvider>
  );
}

const mapStateToProps = state => {
  return {
    selectTabData: tabId => selectTabTree(tabId)(state)
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addTab,
    editTab,
    deleteTab
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookTabs)