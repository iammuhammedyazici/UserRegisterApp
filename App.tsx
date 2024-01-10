import React from 'react';
import { QueryProvider } from './provider/QueryProvider';
import { ReduxProvider } from './provider/ReduxProvider';
import Routes from './navigation/Routes';


function App(): JSX.Element {
  return (
    <QueryProvider>
      <ReduxProvider>
        <Routes />
      </ReduxProvider>
    </QueryProvider>
  );
}

export default App;