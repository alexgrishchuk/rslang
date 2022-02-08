import * as React from 'react';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import RSSlogo from '../../../assets/icon/rs_school.svg';

function Footer() {
  return (
    <footer className="footer">
      <Container maxWidth={false} sx={{ maxWidth: 1920 }}>
        <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={1}>
          <Typography>2022</Typography>
          <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={3}>
            <Link
              className="footer__user-link"
              href="https://github.com/alexgrishchuk"
              color="inherit"
              target="_blank"
              underline="hover"
            >
              Alex Grishchuk | @alexgrishchuk
            </Link>
            <Link
              className="footer__user-link"
              href="https://github.com/barclays13"
              color="inherit"
              target="_blank"
              underline="hover"
            >
              Sergey Zubarev | @barclays13
            </Link>
          </Stack>
          <Link href="https://rs.school/index.html" target="_blank">
            <img className="footer__logo" src={RSSlogo} alt="RSS Logo" />
          </Link>
        </Stack>
      </Container>
    </footer>
  );
}

export default Footer;
