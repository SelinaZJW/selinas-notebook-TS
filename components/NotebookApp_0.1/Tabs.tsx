import * as React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import NotesDisplay from './NotesDisplay';

export default function Notes({backend_1, backend_2}) {

  return (
  <Tabs style={{ marginTop: 5}}>
    <TabList>
      <Tab >{backend_1.data.title}</Tab>
      <Tab>{backend_2.data.title}</Tab>
    </TabList>

    <TabPanel style={{ backgroundColor: 'rgba(0,0,0,0.04)', margin: 0}}>
      <NotesDisplay backend={backend_1} />
    </TabPanel>
    <TabPanel>
      <NotesDisplay backend={backend_2} />
    </TabPanel>
  </Tabs>
)};