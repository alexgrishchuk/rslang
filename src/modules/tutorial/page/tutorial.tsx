import React, { Component } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import DoneOutlineOutlined from '@mui/icons-material/DoneOutlineOutlined';
import CircularProgress from '@mui/material/CircularProgress';

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
  loading: boolean;
}

class Tutorial extends Component<IProps, IState> {
  private isComponentMounted: boolean;

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

    this.isComponentMounted = false;

    this.state = {
      items: [],
      page: pgData.page,
      group: pgData.group,
      colorCategory: '#df8ae5',
      userItems: [],
      isLearnedPage: false,
      loading: false,
    };
  }

  async componentDidMount() {
    this.isComponentMounted = true;

    const { group, page } = this.state;
    this.setState({ loading: true });
    const response: IUserWordInfoWithId[] | null = await getAllCurrentUserWords();
    const request: WordInfo[] = await getWords(group, page);

    if (group === 6) {
      await this.setSixGroup();
    }

    await this.checkLearnedPage();

    if (this.isComponentMounted) {
      if (response) {
        this.setState({ userItems: [...response] });
      }
      this.setState({ items: [...request] });
      this.setState({ loading: false });
    }
  }

  componentDidUpdate() {
    const { page, group } = this.state;
    sessionStorage.setItem('groupPage', JSON.stringify({ page, group }));
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  async setUserItems() {
    const response: IUserWordInfoWithId[] | null = await getAllCurrentUserWords();

    if (response && this.isComponentMounted) {
      this.setState({ userItems: [...response] });
    }
  }

  setSixGroup = async () => {
    const response: IUserWordInfoWithId[] | null = await getAllCurrentUserWords();

    if (response && this.isComponentMounted) {
      const arrHardWords = response.filter((elem: IUserWordInfoWithId) => elem.difficulty === 'hard');
      const arr = arrHardWords.map((elem: IUserWordInfoWithId) => getWordById(elem.wordId));
      const promiseWords = await Promise.all(arr);
      const NUMBER_GROUP = 6;
      const COLOR_GROUP = '#d50000';
      await this.setUserItems();

      if (this.isComponentMounted) {
        this.setState({
          items: [...promiseWords],
          colorCategory: COLOR_GROUP,
          group: NUMBER_GROUP,
        });
      }
    }
  };

  setNewGroup = async (newGroup: number, color: string): Promise<void> => {
    const SET_PAGE = 0;

    if (newGroup === 6) {
      this.setSixGroup();
    } else {
      const request: WordInfo[] = await getWords(newGroup, SET_PAGE);
      this.setUserItems();
      this.setState({
        items: [...request],
        colorCategory: color,
        page: SET_PAGE,
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

    if (countLearnedWords && this.isComponentMounted) {
      this.setState({ isLearnedPage: true });
    } else if (this.isComponentMounted) {
      this.setState({ isLearnedPage: false });
    }
  };

  render() {
    const MAX_PAGE = 30;
    const { items, page, group, colorCategory, userItems, isLearnedPage, loading } = this.state;
    const { isAuthenticated } = this.props;

    return (
      <>
        <main style={{ position: 'relative' }}>
          {loading ? (
            <CircularProgress
              sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            />
          ) : (
            <Container maxWidth={false} sx={{ maxWidth: 1920 }} className={isLearnedPage ? 'page-learned' : ''}>
              <Typography variant="h2" gutterBottom component="h2">
                ??????????????
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
                  ???????????????? ?????????????????? ??????????????
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
              {group !== 6 && <GamesLinks group={group} isLearnedPage={isLearnedPage} page={page} />}
            </Container>
          )}
        </main>
        <Footer />
      </>
    );
  }
}

export default Tutorial;
