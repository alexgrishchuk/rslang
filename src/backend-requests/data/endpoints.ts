import config from '../../config.json';

const URL = config.url;

const ENDPOINTS = {
  words: `${URL}/words`,

  wordById(wordId: string) {
    return `${URL}/words/${wordId}`;
  },

  createUser: `${URL}/users`,

  getUser(userId: string) {
    return `${URL}/users/${userId}`;
  },

  updateUser(userId: string) {
    return `${URL}/users/${userId}`;
  },

  deleteUser(userId: string) {
    return `${URL}/users/${userId}`;
  },

  signIn: `${URL}/signin`,

  getNewTokens(userId: string) {
    return `${URL}/users/${userId}/tokens`;
  },

  getAllUserWords(userId: string) {
    return `${URL}/users/${userId}/words`;
  },

  createUserWord(userId: string, wordId: string) {
    return `${URL}/users/${userId}/words/${wordId}`;
  },
};

export default ENDPOINTS;
