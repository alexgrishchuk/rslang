import React, { ReactElement, useEffect, useState } from 'react';

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

interface IData {
  ssPage: number;
  ssGroup: number;
}

function Tutorial(props: { isAuthenticated: boolean }): ReactElement {
  const { isAuthenticated } = props;
  const [items, setItems] = useState<WordInfo[] | undefined>([]);
  const [page, setPage] = useState(0);
  const [group, setGroup] = useState(0);
  const [colorCategory, setColorCategory] = useState('#ffeb3b');
  const [isFirst, setIsFirst] = useState(true);
  const MAX_PAGE = 30;
  const handleChange = async (event: React.ChangeEvent<unknown>, value: number): Promise<void> => {
    setPage(value - 1);
    const request: WordInfo[] = await getWords(group, value - 1);
    setItems([...request]);
  };

  const setNewGroup = async (newGroup: number, color: string): Promise<void> => {
    setPage(0);
    setGroup(newGroup);
    const request: WordInfo[] = await getWords(newGroup, page);
    setItems([...request]);
    setColorCategory(color);
  };

  // set prev page
  useEffect(() => {
    if (isFirst) {
      setIsFirst(false);
      const SSdata: string | null = sessionStorage.getItem('pageGroup');
      if (SSdata) {
        const data: IData = JSON.parse(SSdata);
        setPage(data.ssPage);
        setGroup(data.ssGroup);
      }
    } else {
      sessionStorage.setItem('pageGroup', JSON.stringify({ ssPage: page, ssGroup: group }));
      setGroup(group);
    }
  }, [isFirst, page, group]);

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
          {!!items?.length && (
            <Pagination
              count={MAX_PAGE}
              page={page + 1}
              onChange={handleChange}
              color="primary"
              sx={{ display: 'flex', justifyContent: 'center', m: 2 }}
            />
          )}
          <Grid container spacing={1} columns={{ xs: 6, sm: 9, md: 12 }} sx={{ m: 2 }}>
            {items?.map((elem: WordInfo) => (
              <Grid item xs={3} key={elem.id}>
                <CardTutorial isAuthenticated={isAuthenticated} data={elem} colorCard={colorCategory} />
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
