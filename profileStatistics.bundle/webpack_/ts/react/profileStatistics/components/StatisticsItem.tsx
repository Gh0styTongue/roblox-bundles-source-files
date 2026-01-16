import { Typography } from '@rbx/ui';
import React from 'react';
import { TranslateFunction } from 'react-utilities';

const StatisticsItem = ({
  label,
  children,
  translate
}: {
  label: string;
  children: React.ReactNode;
  translate: TranslateFunction;
}): JSX.Element => (
  <li className='profile-stat'>
    <Typography variant='body1' color='secondary'>
      {translate(label)}
    </Typography>
    <Typography variant='body1'>{children}</Typography>
  </li>
);

export default StatisticsItem;
