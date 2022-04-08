import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import NotesDisplay from './NotesDisplay';

export default function NoteTabs({backend_1, backend_2}) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="note tabs">   
            {/* need to change styles for tabs */}
            <Tab label={backend_1.data.title} value="1" />
            <Tab label={backend_2.data.title} value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><NotesDisplay backend={backend_1} /> </TabPanel>
        <TabPanel value="2"><NotesDisplay backend={backend_2} /> </TabPanel>
      </TabContext>
    </Box>
  );
}
