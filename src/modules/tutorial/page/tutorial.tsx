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
    const ssData: string | null = sessionStorage.getItem('groupPage');
    let pgData = {
      page: 0,
      group: 0,
    };

    if (ssData) {
      pgData = JSON.parse(ssData);
    }

    this.state = {
      items: [],
      page: pgData.page,
      group: pgData.group,
      colorCategory: '#ffeb3b',
      userItems: [],
    };
  }

  async componentDidMount() {
    console.log('componentDidMount');
    const { page, group } = this.state;
    const response: Array<IUserWord> = await getAllCurrentUserWords();
    const request: WordInfo[] = await getWords(group, page);

    if (group === 6) {
      this.setSixGroup();
    }

    this.setState({
      items: [...request],
      userItems: [...response],
    });
  }

  componentDidUpdate() {
    const { page, group } = this.state;
    sessionStorage.setItem('groupPage', JSON.stringify({ page, group }));
  }

  async setUserItems() {
    const response: Array<IUserWord> | undefined = await getAllCurrentUserWords();
    if (response) {
      this.setState({ userItems: [...response] });
    }
  }

  setSixGroup = async () => {
    const response: Array<IUserWord> = await getAllCurrentUserWords();
    if (response) {
      const arrHardWords = response.filter((elem: IUserWord) => elem.difficulty === 'hard');
      const arr = arrHardWords.map(async (elem) => getWordById(elem.wordId));
      const promiseWords = await Promise.all(arr);
      const NUMBER_GROUP = 6;
      const COLOR_GROUP = '#d50000';
      this.setUserItems();

      this.setState({
        items: [...promiseWords],
        colorCategory: COLOR_GROUP,
        group: NUMBER_GROUP,
      });
    }
  };

  setNewGroup = async (newGroup: number, color: string): Promise<void> => {
    if (newGroup === 6) {
      this.setSixGroup();
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
    const { items, page, group, colorCategory, userItems } = this.state;
    const { isAuthenticated } = this.props;

    return (
      <>
        <main>
          <Container maxWidth={false} sx={{ maxWidth: 1920 }}>
            <Stack direction="row" justifyContent="center" alignItems="flex-start" spacing={2} sx={{ m: 2 }}>
              {CATEGORIES.map((item) => (
                <Card variant="outlined" sx={{ maxWidth: 345 }} key={item.id}>
                  <Button
                    onClick={() => this.setNewGroup(item.id, item.color)}
                    variant={group === item.id ? 'contained' : 'outlined'}
                  >
                    <Typography m={1} variant="h6" color={item.color}>
                      {item.name}
                    </Typography>
                  </Button>
                </Card>
              ))}
            </Stack>
            {!!items?.length && group !== 6 && (
              <Pagination
                count={MAX_PAGE}
                page={page + 1}
                onChange={this.handleChange}
                color="primary"
                sx={{ display: 'flex', justifyContent: 'center', m: 2 }}
              />
            )}
            <Grid container spacing={2} columns={{ xs: 3, sm: 6, md: 12 }} sx={{ m: 1 }}>
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
