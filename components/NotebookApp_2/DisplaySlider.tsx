import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { AlignLeft } from 'react-feather';
import { Button } from '@mui/material';


export default function DisplaySlider({backend}) {
  const [level, setLevel] = React.useState<number>( 1 );

  const handleSliderChange = (event: Event, newLevel: number) => {
    setLevel(newLevel);
  };

  function handleSetDisplay() {
    backend.onSetDisplay(level);  
  }


  return (
    <>
    <Box sx={{ width: 450, '& button': { marginBottom: 1 } }} className="displaySlider">

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
            max={backend.depth}
          />
        </Grid>
        <Grid item>
          <Typography id="display-slider" gutterBottom>
            display {level} of {backend.depth} levels
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