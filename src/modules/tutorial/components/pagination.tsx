import React from 'react';
import Pagination from '@mui/material/Pagination';

function PaginationTutorial() {
  const MAX_PAGE = 30;
  return <Pagination count={MAX_PAGE} color="primary" />;
}

export default PaginationTutorial;
