import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  playSound: {
    textDecoration: 'none',
    display: 'inline-block',
    backgroundColor: '#1976d2',
    color: 'white',
    padding: 15,
    margin: 20,
    fontWeight: 'bolder',
    border: '2px solid #1976d2',
    fontSize: 20,
    borderRadius: '50%',
    height: 170,
    '&:hover': {
      backgroundColor: '#5986F2',
      color: 'white',
    },
  },
  playButton: {
    textDecoration: 'none',
    display: 'inline-block',
    color: '#1976d2',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    fontWeight: 'bolder',
    border: '2px solid #1976d2',
    fontSize: 18,
    '&:disabled': {
      color: '#AAA',
      border: '2px solid #AAA',
    },
  },
  allGameButtons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bullets: {
    display: 'flex',
    justifyContent: 'center',
    '&:div': {
      width: 40,
    },
  },
  timeStyle: {
    textDecoration: 'none',
    backgroundColor: '#1976d2',
    color: 'white',
    margin: 10,
    fontWeight: 'bolder',
    border: '2px solid #1976d2',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    width: 70,
    height: 70,
    fontSize: 70,
  },
  counterContainer: {
    display: 'flex',
    justifyContent: 'center',
    opacity: 0.7,
  },
});

export default useStyles;
