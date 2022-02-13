import React, { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import CardTutorial from '../components/card-tutorial';
import { CATEGORIES } from '../data/const';
import Footer from '../../shared/footer/footer';
import { getWords, WordInfo } from '../../../backend-requests/words-requests';

function Tutorial() {
  const [items, setState] = useState<WordInfo[] | undefined>([]);
  const [page, setPage] = useState(0);
  const [group, setGroup] = useState(0);
  const [colorCategory, setColorCategory] = useState('#ffeb3b');

  const handleChange = async (event: React.ChangeEvent<unknown>, value: number): Promise<void> => {
    setPage(value - 1);
    const request: WordInfo[] = await getWords(group, value - 1);
    await setState([...request]);
  };

  const setNewGroup = async (newGroup: number, color: string): Promise<void> => {
    setGroup(newGroup);
    setPage(0);
    const request: WordInfo[] = await getWords(newGroup, page);
    await setState([...request]);
    setColorCategory(color);
  };

  useEffect(() => {
    sessionStorage.setItem('pageGroup', JSON.stringify({ ssPage: page, ssGroup: group }));
  }, [page, group]);

  return (
    <>
      <main>
        <Container maxWidth={false} sx={{ maxWidth: 1920 }}>
          <Stack direction="row" justifyContent="center" alignItems="flex-start" spacing={2} sx={{ m: 2 }}>
            {CATEGORIES.map((item) => (
              <Card variant="outlined" sx={{ maxWidth: 345 }} key={item.id}>
                <Button onClick={() => setNewGroup(item.id, item.color)} variant="outlined">
                  <Typography m={1} variant="h6" color={item.color}>
                    {item.name}
                  </Typography>
                </Button>
              </Card>
            ))}
          </Stack>
          {items?.length !== 0 && (
            <Pagination
              count={30}
              page={page + 1}
              onChange={handleChange}
              color="primary"
              sx={{ display: 'flex', justifyContent: 'center', m: 2 }}
            />
          )}
          <Grid container spacing={1} columns={{ xs: 6, sm: 9, md: 12 }} sx={{ m: 2 }}>
            {items?.map((elem: WordInfo) => (
              <Grid item xs={3} key={elem.id}>
                <CardTutorial data={elem} colorCard={colorCategory} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default Tutorial;
