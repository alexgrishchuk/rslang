import React from 'react';

import Stack from '@mui/material/Stack';
import { Typography, Grid } from '@mui/material';

import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import InsertChartTwoToneIcon from '@mui/icons-material/InsertChartTwoTone';
import FamilyRestroomTwoToneIcon from '@mui/icons-material/FamilyRestroomTwoTone';
import ExtensionTwoToneIcon from '@mui/icons-material/ExtensionTwoTone';
import BeenhereTwoToneIcon from '@mui/icons-material/BeenhereTwoTone';

function OurAdvantages() {
  return (
    <Stack alignItems="center" m={8}>
      <Typography variant="h4" gutterBottom component="div" mb={4}>
        Наши преимущества:
      </Typography>
      <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={2} sm={4} md={4}>
          <Stack alignItems="center">
            <LibraryBooksTwoToneIcon sx={{ fontSize: 64 }} />
            <Typography align="center" variant="subtitle2" m={2}>
              3600 часто употребляемых английских слов
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Stack alignItems="center">
            <InsertChartTwoToneIcon sx={{ fontSize: 64 }} />
            <Typography variant="subtitle2" align="center" m={2}>
              Удобная статистика, отслеживание прогресса
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Stack alignItems="center">
            <MonetizationOnTwoToneIcon sx={{ fontSize: 64 }} />
            <Typography variant="subtitle2" align="center" m={2}>
              Бесплатное обучение
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Stack alignItems="center">
            <FamilyRestroomTwoToneIcon sx={{ fontSize: 64 }} />
            <Typography variant="subtitle2" align="center" m={2}>
              Обучение для взрослых и детей
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Stack alignItems="center">
            <ExtensionTwoToneIcon sx={{ fontSize: 64 }} />
            <Typography variant="subtitle2" align="center" m={2}>
              Интересные, обучающие мини-игры
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Stack alignItems="center">
            <BeenhereTwoToneIcon sx={{ fontSize: 64 }} />
            <Typography variant="subtitle2" align="center" m={2}>
              Неповторяемость изученых слов
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default OurAdvantages;
