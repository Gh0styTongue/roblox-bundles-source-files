import { ready } from 'core-utilities';
import React from 'react';
import { render } from 'react-dom';
import { CacheProvider, createCache } from '@rbx/ui';
import App from './App';

import '../../../css/profileStatistics/profileStatistics.scss';

ready(() => {
  const container = document.getElementById('profile-statistics-container');
  if (container) {
    const cache = createCache();
    render(
      <CacheProvider cache={cache}>
        <App />
      </CacheProvider>,
      container
    );
  }
});
