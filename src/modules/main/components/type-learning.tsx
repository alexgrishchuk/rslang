import * as React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import HearingOutlinedIcon from '@mui/icons-material/HearingOutlined';
import Forward30OutlinedIcon from '@mui/icons-material/Forward30Outlined';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';

export default function TypeLearning() {
  return (
    <Grid container rowSpacing={3} columnSpacing={{ xs: 3, sm: 2, md: 3 }} mt={8}>
      <Grid item xs={6} p={4}>
        <Paper className="type-learning" elevation={3}>
          <Stack alignItems="center">
            <Typography variant="h3" m={2}>
              Учебник
            </Typography>
            <Typography variant="subtitle2" width={500}>
              В каждом разделе 30 страниц по 20 слов. Представлены перевод слова, тематическое изображение, а также
              произношение как слова отдельно, так и в составе словосочетания.
            </Typography>
            <LibraryBooksOutlinedIcon sx={{ fontSize: 64 }} />
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={6} p={4}>
        <Paper className="type-learning" elevation={3}>
          <Stack alignItems="center">
            <Typography variant="h3" m={2}>
              Словарь
            </Typography>
            <Typography variant="subtitle2" width={500}>
              В данный словарь пользователь добавляет сложные слова. После изучения слово удаляется из словаря.
            </Typography>
            <Typography variant="subtitle2" width={500}>
              Для авторизованных пользователей!
            </Typography>
            <SchoolOutlinedIcon sx={{ fontSize: 64 }} />
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={6} p={4}>
        <Paper className="type-learning" elevation={3}>
          <Stack alignItems="center">
            <Typography variant="h3" m={2}>
              Мини-игра &quot;Аудиовызов&quot;
            </Typography>
            <Typography variant="subtitle2" width={500}>
              Аудирование развивает навыки восприятия речи. Пользователь только слышит слово и видит 5 вариантов его
              перевода. Необходимо выбрать правильный перевод озвученного слова.
            </Typography>
            <HearingOutlinedIcon sx={{ fontSize: 64 }} />
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={6} p={4}>
        <Paper className="type-learning" elevation={3}>
          <Stack alignItems="center">
            <Typography variant="h3" m={2}>
              Мини-игра &quot;Спринт&quot;
            </Typography>
            <Typography variant="subtitle2" width={500}>
              Пользователю будет предлагаться слово на английском языке и его перевод. В течение 30 секунд нужно
              угадывать, верный перевод предложен к английскому слову или нет.
            </Typography>
            <Forward30OutlinedIcon sx={{ fontSize: 64 }} />
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={6} p={4}>
        <Paper className="type-learning" elevation={3}>
          <Stack alignItems="center">
            <Typography variant="h3" m={2}>
              Мини-игра &quot;Гонка&quot;
            </Typography>
            <Typography variant="subtitle2" width={500}>
              Игра позволяет развить навыки восприятия речи за очень ограниченное время. Пользователь только слышит и
              видит слово и видит 5 вариантов его перевода. Необходимо выбрать правильный перевод слова за 10 секунд.
            </Typography>
            <DownhillSkiingIcon sx={{ fontSize: 64 }} />
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}
