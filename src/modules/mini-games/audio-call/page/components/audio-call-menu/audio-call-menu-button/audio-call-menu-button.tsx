import React from 'react';
import { Button } from '@mui/material';

interface IAudioCallMenuButton {
  section: number;
  onClick: () => void;
}

function AudioCallMenuButton(props: IAudioCallMenuButton) {
  const { section, onClick } = props;

  const handleButtonClick = () => {
    onClick();
  };

  return (
    <Button type="button" onClick={handleButtonClick}>
      Раздел {section}
    </Button>
  );
}
export default AudioCallMenuButton;
