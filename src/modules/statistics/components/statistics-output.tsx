import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface IStat {
  caption: string;
  value: number;
}

interface StatisticsOutputProps {
  name: string;
  stat1: IStat;
  stat2: IStat;
  stat3: IStat;
}

export default function StatisticsOutput({ name, stat1, stat2, stat3 }: StatisticsOutputProps) {
  const textStyle = { fontSize: 'subtitle1.fontSize' };

  return (
    <Paper elevation={3} sx={{ mb: 3, padding: 2 }}>
      <Typography sx={{ fontWeight: 'bold', fontSize: 'h6.fontSize' }}>{name}</Typography>
      <Box>
        <Typography sx={textStyle}>
          {stat1.caption}: {stat1.value}
        </Typography>
        <Typography sx={textStyle}>
          {stat2.caption}: {stat2.value}
        </Typography>
        <Typography sx={textStyle}>
          {stat3.caption}: {stat3.value}
        </Typography>
      </Box>
    </Paper>
  );
}
