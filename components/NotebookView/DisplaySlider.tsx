import * as React from 'react';
import {useMemo} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import {AlignLeft} from 'react-feather';
import {Button} from '@mui/material';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {selectTabTree} from "../../src/store/selectors/selectTabTree";
import {MyData} from "./types";

function getDataDepth(dataNode: MyData): number {
  return (Array.isArray(dataNode.children) && dataNode.children?.length !== 0) ?
      1 + Math.max(0, ...dataNode.children.map(getDataDepth)) :
      0;
}

function changeDisplay (dataNode: MyData, displayLevel: number, toggleMap): MyData {
  // dataNode.isOpen = true;
  // console.log(dataNode.level, displayLevel)
  if (dataNode.level < displayLevel) {
    // dataNode.isOpen = true;
    toggleMap[dataNode.id] = true
  }
  if (dataNode.level >= displayLevel) {
    // dataNode.isOpen = false;
    toggleMap[dataNode.id] = false
  }
  if (dataNode.children) {
    dataNode.children.forEach(child => changeDisplay(child, displayLevel, toggleMap));
  }

  // console.log(dataNode)
  return dataNode;
}

const DisplaySlider = ({tabId, selectTabData, setToggleMap}) => {
  const tabData: MyData = selectTabData(tabId)

  const [level, setLevel] = React.useState<number>( 1 );
  const maxDepth = useMemo(() => {
    return getDataDepth(tabData)
  }, [tabData])

  const handleSliderChange = (event: Event, newLevel: number) => {
    setLevel(newLevel);
  };

  function handleSetDisplay() {
    let toggleMap = {}

    changeDisplay(tabData, level, toggleMap)
    setToggleMap(toggleMap)
    // dispatch()
    // backend.onSetDisplay(level);
  }


  return (
    <>
    <Box sx={{ width: 500, '& button': { marginBottom: 1 } }} className="displaySlider">

      {/* <Typography id="display-level" gutterBottom>
        Display Level
      </Typography> */}

      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <AlignLeft />
        </Grid>
        <Grid item xs>
          <Slider
            value={level}
            onChange={handleSliderChange}
            aria-labelledby="display-slider"
            valueLabelDisplay="auto"
            step={1}
            marks={true}
            min={1}
            max={maxDepth}
          />
        </Grid>
        <Grid item>
          <Typography id="display-slider" gutterBottom>
            display {level} of {maxDepth} levels
          </Typography>
         
        </Grid>
        <Grid item style={{ width: '10'}}>
          <Button   size="small" variant="contained" onClick={handleSetDisplay}>Set</Button>
        </Grid>
      </Grid>

    </Box>

    </>
  );
}

const mapStateToProps = state => {
  return {
    selectTabData: tabId => selectTabTree(tabId)(state)
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplaySlider)