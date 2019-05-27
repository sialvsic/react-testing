import React from 'react';
import GlobalStyle, { AppContainer } from './styles';
import Todos from './components/to-do';

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <AppContainer>
        <Todos />
      </AppContainer>
    </React.Fragment>
  );
}

export default App;
