import * as React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import NotesDisplay from './NotesDisplay';

export default function Notes({tabs, backend_1, backend_2, setTabNotes, backend}) {

  const [tabIndex, setTabIndex] = React.useState(0);
  console.log(tabIndex)

  function handleSelectTab (index) {
    setTabIndex(index)
    setTabNotes(index)
  }

  return (
    <>
      <Tabs style={{ marginTop: 5}} selectedIndex={tabIndex} onSelect={handleSelectTab}>
        <TabList>
          {/* <Tab >{backend_1.data.title}</Tab>
          <Tab>{backend_2.data.title}</Tab> */}
          {tabs.map((t: { id: string; title: string; }) => <Tab tabIndex={t.id} key={t.id}>{t.title}</Tab>)}
        </TabList>

        {/* <TabPanel style={{ backgroundColor: 'rgba(0,0,0,0.04)', margin: 0}}>
          <NotesDisplay backend={backend_1} />
        </TabPanel> */}
        {/* <TabPanel>
          <NotesDisplay backend={backend_2} />
        </TabPanel> */}
      </Tabs>

      {/* <NotesDisplay backend={backend_1} /> */}

      <NotesDisplay backend={backend} />
  </>
)};