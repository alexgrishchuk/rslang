import React, { Component } from 'react';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';

import CardTutorial from '../components/card-tutorial';
import { CATEGORIES, IUserWord } from '../data/const';
import Footer from '../../shared/footer/footer';
import { getWordById, getWords, WordInfo } from '../../../backend-requests/words-requests';
import { getAllCurrentUserWords } from '../../../backend-requests/user-words-requests';

type IProps = {
  isAuthenticated: boolean;
};
interface IState {
  items: WordInfo[];
  page: number;
  group: number;
  colorCategory: string;
  userItems: Array<IUserWord>;
}

class Tutorial extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      items: [],
      page: 0,
      group: 0,
      colorCategory: '#ffeb3b',
      userItems: [],
    };
  }

  async componentDidMount() {
    const response: Array<IUserWord> = await getAllCurrentUserWords();
    this.setState({ userItems: [...response] });
  }

  setNewGroup = async (newGroup: number, color: string): Promise<void> => {
    if (newGroup === 6) {
      const { userItems } = this.state;
      const arrHardWords = userItems.filter((elem: IUserWord) => elem.difficulty === 'hard');
      const arr = arrHardWords.map(async (elem) => getWordById(elem.wordId));
      const promiseWords = await Promise.all(arr);

      this.setState({
        items: [...promiseWords],
        colorCategory: color,
        page: 0,
        group: newGroup,
      });
    } else {
      const request: WordInfo[] = await getWords(newGroup, 0);
      this.setState({
        items: [...request],
        colorCategory: color,
        page: 0,
        group: newGroup,
      });
    }
  };

  handleChange = async (_event: React.ChangeEvent<unknown>, value: number): Promise<void> => {
    const { group } = this.state;
    const request: WordInfo[] = await getWords(group, value - 1);

    this.setState({
      items: [...request],
      page: value - 1,
    });
  };

  render() {
    const MAX_PAGE = 30;
    const { items, page, colorCategory, userItems } = this.state;
    const { isAuthenticated } = this.props;

    return (
      <>
        <main>
          <Container maxWidth={false} sx={{ maxWidth: 1920 }}>
            <Stack direction="row" justifyContent="center" alignItems="flex-start" spacing={2} sx={{ m: 2 }}>
              {CATEGORIES.map((item) => (
                <Card variant="outlined" sx={{ maxWidth: 345 }} key={item.id}>
                  <Button onClick={() => this.setNewGroup(item.id, item.color)} variant="outlined">
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
                onChange={this.handleChange}
                color="primary"
                sx={{ display: 'flex', justifyContent: 'center', m: 2 }}
              />
            )}
            <Grid container spacing={1} columns={{ xs: 6, sm: 9, md: 12 }} sx={{ m: 2 }}>
              {items?.map((elem: WordInfo) => (
                <Grid item xs={3} key={elem.id}>
                  <CardTutorial
                    userItems={userItems}
                    isAuthenticated={isAuthenticated}
                    data={elem}
                    colorCard={colorCategory}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        <Footer />
      </>
    );
  }
}

export default Tutorial;
