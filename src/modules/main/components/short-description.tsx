import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import imgMainHead from '../../../assets/main_2.jpg';

function ShortDescription() {
  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
      <Box>
        <Typography variant="h5" gutterBottom component="div">
          RS Lang - Приложения для изучения английского языка.
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="p">
          Учиться в приложении Вы сможете самостоятельно и бесплатно.
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="p">
          RS Lang поможет Вам научиться воспринимать иностранную речь на слух и расширит словарный запас.
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="p">
          Коллекция содержит 3600 часто употребляемых английских слов.
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="p">
          Слова разбитых на разделы по уровню сложности с удобной навигацией.
        </Typography>
      </Box>
      <img src={imgMainHead} width={600} alt="main img" loading="lazy" />
    </Stack>
  );
}

export default ShortDescription;
