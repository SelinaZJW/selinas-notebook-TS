import React, {useEffect} from 'react';
import {Button} from '@mui/material';
import {Sortable} from 'devextreme-react/sortable';
import TabPanel from 'devextreme-react/tab-panel';
import 'devextreme/data/odata/store';
import 'devextreme/dist/css/dx.light.css';
import {Plus, Trash2} from 'react-feather'
import Tooltip from '@mui/material/Tooltip';
import Editable from '../NotebookDisplay/components/Editable';
import NotebookDisplay from '../NotebookDisplay/NotebookDisplay';

import {connect, useDispatch, useSelector} from 'react-redux';

import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'
import {selectTabTree} from "../../store/selectors/selectTabTree";
import {bindActionCreators} from "redux";
import {createTab} from "../../store/actions/createTab";
import {updateTab} from "../../store/actions/updateTab";
import {deleteTab} from "../../store/actions/deleteTab";
import {ITab} from "../../model";
import {setTabTitle} from "../../store/actions/setTabTitle";

const NotesTemplate = (props) => {
  const tabId = props.data

  return (
      <>
        <NotebookDisplay tabId={tabId} />
        {/*{JSON.stringify(backend.data, null ,2)}*/}
      </>
  );
}

const NotebookTabs: React.FC<any> = ({createTab, setTabTitle, updateTab, deleteTab}) => {
  const dispatch = useDispatch()

  const tabData = useSelector((state: any) => state.tabs.data)
  const tabIds = useSelector((state: any) => state.tabs.orderedTabIds)
  // const tabs: ITab[] = useSelector((state: any) => Object.values(state.tabs.data))

  // const [tabIds, setTabIds] = React.useState([]);

  /*useEffect(() => {
    const newTabIds = Object.keys(tabData)

    Object.values(tabData.sort((a,b)=>a.weight-b.weight)

    if(tabIds.length == newTabIds.length) return;

    setTabIds(newTabIds)
  }, [tabData])*/

  const setTabIds = (tabIds) => {
    dispatch({
      type: 'SET_ORDERED_TAB_IDS',
      tabIds
    })
  }

  const [selectedItem, setSelectedItem] = React.useState(tabIds[0]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const addTabHandler = () => {
    const newItem = {
      isOpen: true,
      title: "new tab",
      children: [],
      level: 0,
      index: tabIds.length,
    };

    createTab("new tab").then(newTab => {
      setTabIds([...tabIds, newTab.id]);
      setSelectedItem(newTab);
    })


    // dispatch(createTab("new tab", selectedItem?.id))

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

  const renderTitle = (tabId) => {
    const title = tabData[tabId]?.title

    const deleteTab = () => {
      deleteTabHandler(tabId)
    }

    return (
        <div className='singleTab'>
            <Editable init={`${title}`} onEdit={newValue => setTabTitle(tabId, newValue)} />
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
    console.log("onTabDrop")

    const newData = [...tabIds];
    newData.splice(e.fromIndex, 1);
    newData.splice(e.toIndex, 0, e.itemData);
    setTabIds(newData);

    const tabId = e.itemData
    console.log(tabId)
    // const tabPreId = e.toData[e.toIndex-1].id

    if (e.toIndex === 0 && e.fromIndex !== e.toIndex) {
      const updatedTab = {first: true}
      updateTab(tabId, updatedTab)
      console.log("changed to first")
    }
    if (e.toIndex !== 0 && e.fromIndex > e.toIndex) {
      const afterId = e.toData[e.toIndex-1]
      const updatedTab = {after: afterId}
      updateTab(tabId, updatedTab)
      // setSelectedItem(e.toData[e.toIndex])
      console.log(`changed to front to ${[e.toIndex]} `)
    }
    if (e.toIndex !== 0 && e.fromIndex < e.toIndex) {
      const afterId = e.toData[e.toIndex]
      const updatedTab = {after: afterId}
      updateTab(tabId, updatedTab)
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
        data={tabIds}
        itemOrientation="horizontal"
        dragDirection="horizontal"
        onDragStart={onTabDragStart}
        onReorder={onTabDrop}
        
      >
        <TabPanel
          dataSource={tabIds}
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
        {JSON.stringify(tabData, null, 2)}
      </pre>
        <pre>
        {JSON.stringify(tabIds, null, 2)}
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
    createTab,
    setTabTitle,
    updateTab,
    deleteTab
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookTabs)