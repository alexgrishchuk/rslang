import React, { Component } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import AddTask from '@mui/icons-material/AddTask';

import { IUserWord } from '../data/const';
import { WordInfo } from '../../../backend-requests/words-requests';
import { createCurrentUserWord, putCurrentUserWord } from '../../../backend-requests/user-words-requests';

interface IState {
  difficultWord: boolean;
  learnedWord: boolean;
}

type IProps = {
  data: WordInfo;
  userItems: Array<IUserWord>;
};

class WrapperBtn extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      difficultWord: false,
      learnedWord: false,
    };
  }

  async componentDidMount() {
    const {
      userItems,
      data: { id },
    } = this.props;

    const isDifficultWord = userItems.find((elem: IUserWord) => elem.wordId === id && elem.difficulty === 'hard');
    const isLearnedWord = userItems.find((elem: IUserWord) => elem.wordId === id && elem.difficulty === 'easy');

    if (isDifficultWord) {
      this.setState({ difficultWord: true });
    } else {
      this.setState({ difficultWord: false });
    }

    if (isLearnedWord) {
      this.setState({ learnedWord: true });
    } else {
      this.setState({ learnedWord: false });
    }
  }

  changeDifficultWord = () => {
    const { difficultWord, learnedWord } = this.state;
    const {
      data: { id },
    } = this.props;

    if (!difficultWord && !learnedWord) {
      createCurrentUserWord(id, { difficulty: 'hard', optional: {} });
    }

    if (!difficultWord && learnedWord) {
      putCurrentUserWord(id, { difficulty: 'hard', optional: {} });
      this.setState({ learnedWord: false });
    }

    if (difficultWord && !learnedWord) {
      putCurrentUserWord(id, { difficulty: 'easy', optional: {} });
      this.setState({ learnedWord: true });
    }

    this.setState({ difficultWord: !difficultWord });
  };

  changeLearnedWord = () => {
    const { difficultWord, learnedWord } = this.state;
    const {
      data: { id },
    } = this.props;

    if (!learnedWord && !difficultWord) {
      createCurrentUserWord(id, { difficulty: 'easy', optional: {} });
    }

    if (learnedWord && !difficultWord) {
      putCurrentUserWord(id, { difficulty: 'hard', optional: {} });
      this.setState({ difficultWord: true });
    }

    if (!learnedWord && difficultWord) {
      putCurrentUserWord(id, { difficulty: 'easy', optional: {} });
      this.setState({ difficultWord: false });
    }

    this.setState({ learnedWord: !learnedWord });
  };

  render() {
    const { learnedWord, difficultWord } = this.state;

    return (
      <Stack direction="row" spacing={2} justifyContent="space-around" mt={2}>
        <Button
          onClick={this.changeDifficultWord}
          variant={difficultWord ? 'outlined' : 'contained'}
          startIcon={difficultWord ? <AddTask /> : <Add />}
        >
          Сложное
        </Button>
        <Button
          onClick={this.changeLearnedWord}
          variant={learnedWord ? 'outlined' : 'contained'}
          startIcon={learnedWord ? <AddTask /> : <Add />}
        >
          Изученное
        </Button>
      </Stack>
    );
  }
}

export default WrapperBtn;
