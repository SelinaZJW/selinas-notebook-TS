import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { AlignLeft } from 'react-feather';
import { Button } from '@mui/material';

type LevelProps = {
  level: number;
  setLevel: any;
  handleSetDisplay: any;
  maxLevel: number
}

export default function DisplaySlider(props: LevelProps) {

  const handleSliderChange = (event: Event, newLevel: number) => {
    props.setLevel(newLevel);
    // backend.onSetDisplay(newLevel);
  };

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue(event.target.value === '' ? 1 : Number(event.target.value));
  // };

  // const handleBlur = () => {
  //   if (value < 1) {
  //     setValue(1);
  //   } else if (value > 3) {
  //     setValue(3);
  //   }

  //   backend.onSetDisplay(value);
  // };

  return (
    <>
    <Box sx={{ width: 450, '& button': { marginBottom: 1 } }}>

      <Typography id="display-level" gutterBottom>
        Display Level
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <AlignLeft />
        </Grid>
        <Grid item xs>
          <Slider
            value={props.level}
            onChange={handleSliderChange}
            aria-labelledby="display-slider"
            valueLabelDisplay="auto"
            step={1}
            marks={true}
            min={1}
            max={props.maxLevel}
          />
        </Grid>
        <Grid item>
          <Typography id="display-slider" gutterBottom>
            {props.level} of {props.maxLevel} levels
          </Typography>
          {/* <Input
            value={value}
            size="small"
            // onChange={handleInputChange}
            // onBlur={handleBlur}
            // inputProps={{
            //   step: 1,
            //   min: 1,
            //   max: 3,
            //   type: 'number',
            //   'aria-labelledby': 'display-slider',
            // }}
          /> */}
        </Grid>
        <Grid item style={{ width: '10'}}>
          {/* <button style={{ margin: '5'}} onClick={props.handleSetDisplay}> Set </button> */}
          <Button   size="small" variant="contained" onClick={props.handleSetDisplay}>Set</Button>
        </Grid>
      </Grid>

    </Box>

    </>
  );
}