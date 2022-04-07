import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { AlignLeft } from 'react-feather';
import { useBackend } from './backend';
import { DataDisplay } from './DataDisplay';

type LevelProps = {
  level: number;
  setLevel: any
}

export default function DisplaySlider(props: LevelProps) {
  // const [level, setLevel] = React.useState<number>(
  //   1,
  // );

  const backend = useBackend();

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
    <Box sx={{ width: 250 }}>
      <Typography id="display-slider" gutterBottom>
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
            max={3}
          />
        </Grid>
        <Grid item>
          <Typography id="display-level" gutterBottom>
            {props.level}
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
      </Grid>
    </Box>

    <DataDisplay />
    </>
  );
}