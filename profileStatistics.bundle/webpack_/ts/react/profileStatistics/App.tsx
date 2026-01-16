import React, { useEffect, useState } from 'react';
import { withTranslations, WithTranslationsProps } from 'react-utilities';
import { UIThemeProvider } from '@rbx/ui';
import translationConfig from './translation.config';
import StatisticsContainer from './containers/StatisticsContainer';

const App = ({ translate }: WithTranslationsProps) => {
  const [darktheme, setDarkTheme] = useState(document.body.classList.contains('dark-theme'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkTheme(document.body.classList.contains('dark-theme'));
    });
    observer.observe(document.body, { attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <UIThemeProvider theme={darktheme ? 'dark' : 'light'}>
      <StatisticsContainer translate={translate} />
    </UIThemeProvider>
  );
};

export default withTranslations(App, translationConfig);
