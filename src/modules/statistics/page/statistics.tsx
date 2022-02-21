import React from 'react';
import Footer from '../../shared/footer/footer';
import UserStatistics from '../components/user-statistics';

interface IStatisticsProps {
  isAuthenticated: boolean;
}

function Statistics({ isAuthenticated }: IStatisticsProps) {
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <main>
        <UserStatistics />
      </main>
      <Footer />
    </>
  );
}

export default Statistics;
