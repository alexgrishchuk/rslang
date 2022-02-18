import React from 'react';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface IAudioCallMenuButton {
  section: number;
  onClick: () => void;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: '#E3E3E3',
    margin: 20,
    fontWeight: 'bolder',
    color: 'black',
    height: 70,
    fontSize: 20,
  },
});

function AudioCallMenuButton(props: IAudioCallMenuButton) {
  const { section, onClick } = props;

  const classes = useStyles();

  const handleButtonClick = () => {
    onClick();
  };

  return (
    <Button type="button" className={classes.root} onClick={handleButtonClick}>
      Раздел {section}
    </Button>
  );
}
export default AudioCallMenuButton;
