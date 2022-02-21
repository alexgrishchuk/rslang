import React, { Component } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import DoneOutlineOutlined from '@mui/icons-material/DoneOutlineOutlined';

import CardTutorial from '../components/card-tutorial';
import Footer from '../../shared/footer/footer';
import GamesLinks from '../components/games-links';
import { CATEGORIES } from '../data/const';
import { getWordById, getWords, WordInfo } from '../../../backend-requests/words-requests';
import { getAllCurrentUserWords, IUserWordInfoWithId } from '../../../backend-requests/user-words-requests';
import { isAllWordsOnPageLearned } from '../../../backend-requests/aggregated-words-requests';

type IProps = {
  isAuthenticated: boolean;
};
interface IState {
  items: WordInfo[];
  page: number;
  group: number;
  colorCategory: string;
  userItems: IUserWordInfoWithId[];
  isLearnedPage: boolean;
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
      colorCategory: '#df8ae5',
      userItems: [],
      isLearnedPage: false,
    };
  }

  async componentDidMount() {
    const { group, page } = this.state;
    const response: IUserWordInfoWithId[] | null = await getAllCurrentUserWords();
    const request: WordInfo[] = await getWords(group, page);

    if (group === 6) {
      this.setSixGroup();
    }

    if (response) {
      this.setState({ userItems: [...response] });
    }

    this.setState({ items: [...request] });
    this.checkLearnedPage();
  }

  componentDidUpdate() {
    const { page, group } = this.state;
    sessionStorage.setItem('groupPage', JSON.stringify({ page, group }));
  }

  async setUserItems() {
    const response: IUserWordInfoWithId[] | null = await getAllCurrentUserWords();

    if (response) {
      this.setState({ userItems: [...response] });
    }
  }

  setSixGroup = async () => {
    const response: IUserWordInfoWithId[] | null = await getAllCurrentUserWords();

    if (response) {
      const arrHardWords = response.filter((elem: IUserWordInfoWithId) => elem.difficulty === 'hard');
      const arr = arrHardWords.map((elem: IUserWordInfoWithId) => getWordById(elem.wordId));
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

    this.checkLearnedPage();
  };

  handleChange = async (_event: React.ChangeEvent<unknown>, value: number): Promise<void> => {
    const { group } = this.state;
    const request: WordInfo[] = await getWords(group, value - 1);

    this.setState({
      items: [...request],
      page: value - 1,
    });

    this.checkLearnedPage();
  };

  checkLearnedPage = async () => {
    const { group, page } = this.state;
    const countLearnedWords: boolean = await isAllWordsOnPageLearned(group, page);
    console.log('countLearnedWords', countLearnedWords);

    if (countLearnedWords) {
      this.setState({ isLearnedPage: true });
    } else {
      this.setState({ isLearnedPage: false });
    }
  };

  render() {
    const MAX_PAGE = 30;
    const { items, page, group, colorCategory, userItems, isLearnedPage } = this.state;
    const { isAuthenticated } = this.props;

    return (
      <>
        <main>
          <Container maxWidth={false} sx={{ maxWidth: 1920 }} className={isLearnedPage ? 'page-learned' : ''}>
            <Typography variant="h2" gutterBottom component="h2">
              Учебник
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }} justifyContent="center">
              {CATEGORIES.map((item) => (
                <Grid item xs="auto" key={item.id}>
                  <Button
                    onClick={() => this.setNewGroup(item.id, item.color)}
                    variant={group === item.id ? 'contained' : 'outlined'}
                  >
                    <Typography m={1} variant="h6" color={item.color}>
                      {item.name}
                    </Typography>
                  </Button>
                </Grid>
              ))}
            </Grid>
            {!!items?.length && group !== 6 && (
              <Pagination
                count={MAX_PAGE}
                page={page + 1}
                onChange={this.handleChange}
                color="primary"
                sx={{ display: 'flex', justifyContent: 'center', m: 2 }}
              />
            )}
            {isLearnedPage && (
              <Typography variant="h3" align="center">
                Страница полностью изучена
                <DoneOutlineOutlined sx={{ ml: 5, fontSize: 40 }} />
              </Typography>
            )}
            <Grid container columnSpacing={1} rowSpacing={2} sx={{ ml: 0, mt: 1, mb: 1 }}>
              {items?.map((elem: WordInfo) => (
                <Grid item xl={3} lg={4} md={6} xs={12} key={elem.id}>
                  <CardTutorial
                    userItems={userItems}
                    isAuthenticated={isAuthenticated}
                    data={elem}
                    colorCard={colorCategory}
                  />
                </Grid>
              ))}
            </Grid>
            <GamesLinks isLearnedPage={isLearnedPage} />
          </Container>
        </main>
        <Footer />
      </>
    );
  }
}

export default Tutorial;
