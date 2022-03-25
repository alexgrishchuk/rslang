import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import useMediaQuery from '@mui/material/useMediaQuery';

function StartLearning() {
  const steps = ['Найти наше приложение', 'Зарегистрироваться', 'Начать обучение и отслеживать свои успехи!'];
  const isSmall = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{ width: '100%' }} mt={10} mb={10}>
      <Typography variant="h4" gutterBottom component="div" align="center" mb={4}>
        Как начать обучение?
      </Typography>
      <Stepper activeStep={1} alternativeLabel={!isSmall} orientation={isSmall ? 'vertical' : 'horizontal'}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default StartLearning;
